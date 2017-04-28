const socketIO = require('socket.io'),
    uuid = require('uuid'),
    crypto = require('crypto');

module.exports = function (server, config) {
    const io = socketIO.listen(server),
        users = {},
        defaultResources = {
            screen: false,
            video: true,
            audio: true,
        };

    io.sockets.on('connection', function (client) {
        console.log('connected: ' + client.id);
        client.resources = defaultResources;

        const findUserByName = name => {
            const id = Object.keys(users)
                .find(id => users[id] && users[id].name === name);
            return id && users[id];
        };

        const getUser = () => {
            return users[client.id];
        };

        const updateUserId = user => {
            delete users[user.id];
            user.id = client.id;
            users[user.id] = user;
        };

        const loginUser = name => {
            const user = users[client.id];
            const oldUser = findUserByName(name);
            if (oldUser && oldUser.connection !== client) {
                console.log(`Found user with name ${name} and changed id from ${oldUser.id} to ${client.id}`);
                updateUserId(oldUser);
                oldUser.loggedIn = true;
            } else {
                user.name = name;
                user.loggedIn = true;
                console.log(`User ${user.name} logged in.`);
            }
        };

        const isLoggedIn = () => {
            const user = users[client.id];
            return user && user.isLoggedIn && user.name;
        };

        const addUser = () => {
            users[client.id] = {
                id: client.id,
                name: '',
                loggedIn: false,
                connection: client,
                room: null
            };
            console.log(`Added connection ${client.id} to users.`);
        };

        const logoutUser = () => {
            const user = getUser();

            if (user) {
                console.log(`Logging out user ${user.name}`);
                user.loggedIn = false;
            }
        };

        const removeUser = () => {
            const user = getUser();
            if (user) {
                const {id, name} = user;
                console.log(`Removed user ${name}`);
                delete  users[id];
            }
        };

        const getClients = (loggedIn) => {
            const user = getUser();
            return Object.keys(users).filter(id => {
                const u = users[id];
                if (loggedIn) {
                    return u && u.name !== user.name && u.loggedIn;
                } else {
                    return u;
                }
            }).map(id => {
                return {
                    id: id,
                    name: users[id].name
                }
            })
        };

        const clientsInRoom = name => {
            if (name) {
                const clients = Object.keys(users).filter(id => users[id].room === name)
                    .map(id => {
                        return users[id];
                    });
                return clients;
            }
            return [];
        };

        const describeRoom = name => {
            const clients = clientsInRoom(name);
            const result = {
                clients: clients.reduce((acc, c) => {
                    if (c.id) {
                        acc[c.id] = c.connection.resources || defaultResources;
                        acc[c.id].data = {
                            name: c.name,
                            room: c.room,
                            id: c.id
                        };
                    }
                    return acc;
                }, {})
            };
            return result;
        };

        addUser();

        console.log('Clients logged in: ', getClients(true));

        client.on('login', data => {
            const {name} = data;

            if (!name) {
                client.emit('login_failed', {message: 'no username'});
            }

            const user = getUser();
            const clients = getClients(true);

            if (isLoggedIn()) {
                const allClients = getClients();
                const loggedInClients = getClients(true);
                console.log(`${user.name} is already logged in.`);
                console.log('Clients: ', allClients);
                client.emit('login_success', {name});
                client.emit('clients_success', {clients: loggedInClients});
            } else {
                loginUser(name);
                const allClients = getClients();
                const loggedInClients = getClients(true);
                console.log('Clients: ', allClients);
                client.emit('login_success', {name});
                client.emit('clients_success', {clients: loggedInClients});
            }
        });

        client.on('logout', ({name}) => {
            const user = getUser();
            if (user && user.name === name) {
                logoutUser();
                console.log(`User ${name} logged out.`);
                client.emit('logout_success', {name});
            }
        });

        client.on('clients', ({loggedIn}) => {
            const clients = getClients(loggedIn);
            console.log('sending clients: ', clients);
            client.emit('clients_success', {clients});
        });

        client.on('invite', ({name, bookId}) => {
            const user = getUser();
            console.log(`${user.name}(${user.id}) invites ${name} for a session to read book with id ${bookId}.`);

            const otherClient = findUserByName(name);
            if (!otherClient) return;

            console.log(`Found other client ${otherClient.name}, emitting invite`);

            otherClient.connection && otherClient.connection.emit('invitation_received', {
                from: user.name,
                bookId
            });
        });

        client.on('invitation_accept', ({name, bookId}) => {
            const fromUser = getUser();
            const toUser = findUserByName(name);
            toUser && toUser.connection.emit('invite_accepted', {name: fromUser.name, bookId})
        });

        client.on('invitation_decline', ({name, bookId}) => {
            const fromUser = getUser();
            const toUser = findUserByName(name);
            toUser && toUser.connection.emit('invite_declined', {name: fromUser.name, bookId});
        });

        // pass a message to another id
        client.on('message', function (details) {
            if (!details) return;

            const otherClient = io.to(details.to);
            if (!otherClient) return;

            details.from = client.id;
            otherClient.emit('message', details);
        });

        client.on('shareScreen', function () {
            client.resources.screen = true;
        });

        client.on('unshareScreen', function (type) {
            client.resources.screen = false;
            removeFeed('screen');
        });

        client.on('join', joinUser);

        client.on('interaction', function (data) {
            const user = getUser();
            const {name, room} = users;
            if (room) {
                data.from = name;
                console.log(`${name} interacts with all users in room ${room}.`, data);
                io.sockets.in(room).emit('interaction_received', data);
            } else {
                console.log(`${name} is in no room yet`);
            }
        });


        function removeFeed(type) {
            const user = getUser();
            if (user && user.room) {
                io.sockets.in(user.room).emit('remove', {
                    id: user.id,
                    type: type
                });
                if (!type) {
                    client.leave(user.room);
                    user.room = undefined;
                }
            }
        }

        function joinUser(invite, cb) {
            const userName = invite.name;
            const bookId = invite.bookId;
            const otherUser = findUserByName(userName);

            if (otherUser) {
                const user = getUser();

                console.log(`Found user ${otherUser.name}`);
                removeFeed();
                if (otherUser.room) {
                    console.log(`${otherUser.name} is already in room ${otherUser.room}, following`);
                    console.log(`User ${user.name} joining room ${otherUser.room} from user ${otherUser.name}`);
                    safeCb(cb)(null, describeRoom(otherUser.room));
                    client.join(otherUser.room);
                    user.room = otherUser.room;
                } else {
                    const roomId = uuid();
                    console.log(`Client ${user.name} joining new room ${roomId}`);
                    user.room = roomId;
                    safeCb(cb)(null, describeRoom(roomId));
                    client.join(roomId);
                    console.log(`Inviting user ${otherUser.name} (${otherUser.id}) to room ${roomId}`);
                    otherUser.connection && otherUser.connection.emit('invitation_received', {
                        room: roomId,
                        from: user.name,
                        bookId
                    });
                }
            } else {
                console.log(`User ${userName} not found`);
            }
        }

        function join(name, cb) {
            name = 'test';
            // sanity check
            if (typeof name !== 'string') return;
            // check if maximum number of clients reached
            if (config.rooms && config.rooms.maxClients > 0 &&
                clientsInRoom(name) >= config.rooms.maxClients) {
                safeCb(cb)('full');
                return;
            }

            // leave any existing rooms
            removeFeed();
            safeCb(cb)(null, describeRoom(name));
            const user = getUser();
            console.log(`Client ${user.name} joining room ${name}`);
            client.join(name);
            user.room = name;
        }

        // we don't want to pass "leave" directly because the
        // event type string of "socket end" gets passed too.
        client.on('disconnect', function () {
            logoutUser();
            removeFeed();
            console.log(`disconnected ${client.id}`);
            removeUser();
            client.disconnect();
        });
        client.on('leave', function () {
            removeFeed();
        });

        client.on('create', function (name, cb) {
            console.log('creating ' + name);
            if (arguments.length == 2) {
                cb = (typeof cb == 'function') ? cb : function () {
                };
                name = name || uuid();
            } else {
                cb = name;
                name = uuid();
            }
            // check if exists
            const room = io.nsps['/'].adapter.rooms[name];
            if (room && room.length) {
                safeCb(cb)('taken');
            } else {
                join(name);
                safeCb(cb)(null, name);
            }
        });

        // support for logging full webrtc traces to stdout
        // useful for large-scale error monitoring
        client.on('trace', function (data) {
            console.log('trace', JSON.stringify(
                [data.type, data.session, data.prefix, data.peer, data.time, data.value]
            ));
        });


        // tell client about stun and turn servers and generate nonces
        client.emit('stunservers', config.stunservers || []);

        // create shared secret nonces for TURN authentication
        // the process is described in draft-uberti-behave-turn-rest
        const credentials = [];
        // allow selectively vending turn credentials based on origin.
        var origin = client.handshake.headers.origin;
        if (!config.turnorigins || config.turnorigins.indexOf(origin) !== -1) {
            config.turnservers.forEach(function (server) {
                const hmac = crypto.createHmac('sha1', server.secret);
                // default to 86400 seconds timeout unless specified
                const username = Math.floor(new Date().getTime() / 1000) + (server.expiry || 86400) + "";
                hmac.update(username);
                credentials.push({
                    username: username,
                    credential: hmac.digest('base64'),
                    urls: server.urls || server.url
                });
            });
        }
        client.emit('turnservers', credentials);
    });
};

function safeCb(cb) {
    if (typeof cb === 'function') {
        return cb;
    } else {
        return function () {
        };
    }
}
