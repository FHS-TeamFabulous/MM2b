const socketIO = require('socket.io'),
    uuid = require('uuid'),
    crypto = require('crypto');

module.exports = function (server, config) {
    const io = socketIO.listen(server),
        users = {},
        defaultResources = {
            screen: false,
            video: true,
            audio: false,
        };

    io.sockets.on('connection', function (client) {
        console.log('connected: ' + client.id);
        client.resources = defaultResources;

        const findUserByName = name => {
            return Object.keys(users)
                .find(id => users[id] && users[id].name === name);
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
            const user = users[client.id];

            console.log(`Logging out user ${user.name}`);
            user.loggedIn = false;
        };

        const removeUser = () => {
            delete  users[client.id];
        };

        const getClients = (loggedIn) => {
            return Object.keys(users).filter(id => {
                if (loggedIn) {
                    return users[id] && users[id].name !== client.name && users[id].loggedIn;
                } else {
                    return users[id];
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
                const test = Object.keys(users).filter(id => users[id].room).map(id => users[id]);
                console.log(test);
                const clients = Object.keys(users).filter(id => users[id].room === name)
                    .map(id => {
                        return users[id];
                    });
                console.log('clients in room ' + name, clients);
                return clients;
            }
            return [];
        };

        const describeRoom = name => {
            const clients = clientsInRoom(name);
            console.log('all clients: ', clients);

            const result = {
                clients: clients.reduce((acc, c) => {
                    if (c.id) {
                        acc[c.id] = c.connection.resources || defaultResources;
                    }
                    return acc;
                }, {})
            };
            console.log('RoomDescription: ', result);
            return result;
        };

        addUser();

        console.log('Clients logged in: ', getClients(true));

        client.on('login', data => {
            const { name } = data;
            const user = getUser();
            const clients = getClients(true);

            if (isLoggedIn()) {
                client.emit('login_success', { name });
                client.emit('clients_success', { clients });
            } else {
                loginUser(name);
                client.emit('login_success', { name });
                client.emit('clients_success', { clients });
            }
        });

        client.on('logout', ({name}) => {
            const user = getUser();
            if (user && user.name === name) {
                logoutUser();
                console.log(`User ${name} logged out.`);
                client.emit('logout_success', { name });
            }
        });

        client.on('clients', ({loggedIn}) => {
            const clients = getClients(loggedIn);
            console.log('sending clients: ', clients);
            client.emit('clients_success', { clients });
        });

        client.on('invite', ({name}) => {
            console.log(`${client.name}(${client.id}) invites ${name} for a session.`);

            if (!data) return;

            const otherClient = io.to(name);
            if (!otherClient) return;

            otherClient.emit('invitation', {
                from: client.name,
                to: name
            });
        });

        client.on('invitation_accept', ({from, to}) => {
            client.emit('invite_accepted', { from, to })
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

        client.on('join', join);

        client.on('interaction', function (data) {
            console.log(`${users[client.id]} interacts with all users in room ${client.room}.`, data);
            io.sockets.in(client.room).emit('interaction_received', data);
        });


        function removeFeed(type) {
            if (client.room) {
                io.sockets.in(client.room).emit('remove', {
                    id: client.id,
                    type: type
                });
                if (!type) {
                    client.leave(client.room);
                    client.room = undefined;
                }
            }
        }

        function joinUser(userName, cb) {
            client.join('test');
            safeCb(cb)(null, userName + 'joined test room');
            /*const user = findUserByName(userName);

            if (user) {
                const { room, name, connection } = user;
                removeFeed();
                if (room) {
                    console.log(`Client ${client.name} joining room ${room} from user ${name}`);
                    client.join('test');
                    safeCb(cb)(null, describeRoom(user.room));
                    client.room = user.room;
                } else {
                    const roomId = uuid();
                    console.log(`Client ${client.name} joining room ${roomId}`);
                    client.room = roomId;
                    client.join('test');
                    safeCb(cb)(null, describeRoom(roomId));
                    console.log(`Inviting user ${name} to room ${roomId}`);
                    user.connection && user.connection.emit('invitation_received', { room: roomId, from: client.name });
                    console.log('user connection', user.connection);
                }
            } else {
                console.log(`User ${userName} not found`);
            }*/
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
            logoutUser(users[client.id]);
            removeFeed();
            console.log(`disconnected ${client.id}`);
            client.disconnect();
        });
        client.on('leave', function () {
            removeFeed();
        });

        client.on('create', function (name, cb) {
            console.log('creating ' + name);
            if (arguments.length == 2) {
                cb = (typeof cb == 'function') ? cb : function () {};
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
        return function () {};
    }
}
