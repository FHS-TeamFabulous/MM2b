const socketIO = require('socket.io'),
    uuid = require('uuid'),
    crypto = require('crypto'),
    Users = require('./users'),
    User = require('./user');

module.exports = function (server, config) {
    const io = socketIO.listen(server),
        users = new Users();

    io.on('connection', function (client) {
        console.log('connected: ' + client.id);
        const user = new User(client.id);

        const loginUser = name => {
            const user = users.findById(client.id);
            const oldUser = users.findByName(name);

            if (oldUser && oldUser.id !== user.id) {
                console.log(`Found user with name ${name} and changed id from ${oldUser.id} to ${user.id}`);
                users.updateUserId(oldUser.id, user.id).loggedIn = true;
            } else {
                user.name = name;
                user.loggedIn = true;
                console.log(`User ${user.name} logged in.`);
            }
        };

        const isLoggedIn = () => {
            const user = users.findById(client.id);
            return user && user.name && user.isLoggedIn;
        };

        const logoutUser = user => {
            if (user) {
                console.log(`Logging out user ${user.name}`);
                user.loggedIn = false;
            }
        };

        const getClients = (loggedIn) => {
            const user = users.findById(client.id);

            return users.getUsers()
                .filter(client => {
                    if (loggedIn) {
                        return client && client.name !== user.name && client.loggedIn;
                    }

                    return client;
                });
        };

        const clientsInRoom = name => {
            return users.getUsers()
                .filter(user => user.room === name);
        };

        const describeRoom = name => {
            const clients = clientsInRoom(name);
            const result = {
                clients: clients.reduce((acc, c) => {
                    if (c.id) {
                        acc[c.id] = c.resources;
                    }
                    return acc;
                }, {})
            };
            return result;
        };

        users.add(new User(client.id));

        console.log('Clients logged in: ', getClients(true));

        client.on('login', data => {
            const {name} = data;

            if (!name) {
                client.emit('login_failed', {message: 'no username'});
            }

            const user = users.findById(client.id);

            if (isLoggedIn()) {
                console.log(`${user.name} is already logged in.`);
                console.log('Clients: ', getClients());
                client.emit('login_success', {name});
                client.emit('clients_success', {clients: getClients(true)});
            } else {
                loginUser(name);
                console.log('Clients: ', getClients());
                client.emit('login_success', {name});
                client.emit('clients_success', {clients: getClients(true)});
            }
        });

        client.on('logout', ({name}) => {
            const user = users.findById(client.id);
            if (user && user.name === name) {
                logoutUser(user);
                console.log(`User ${name} logged out.`);
                client.emit('logout_success', {name});
            }
        });

        client.on('clients', ({loggedIn}) => {
            client.emit('clients_success', {clients: getClients(loggedIn)});
        });

        client.on('invite', ({name, bookId}) => {
            const user = users.findById(client.id);
            console.log(`${user.name}(${user.id}) invites ${name} for a session to read book with id ${bookId}.`);

            const otherClient = users.findByName(name);
            if (!otherClient) return;

            console.log(`Found other client ${otherClient.name}, emitting invite`);

            io.to(otherClient.id).emit('invitation_received', {
                name: user.name,
                bookId
            });
        });

        client.on('invitation_accept', ({name, bookId}) => {
            const fromUser = users.findById(client.id);
            const toUser = users.findByName(name);
            toUser && io.to(toUser.id).emit('invite_accepted', {name: fromUser.name, bookId})
        });

        client.on('invitation_decline', ({name, bookId}) => {
            const fromUser = users.findById(client.id);
            const toUser = users.findByName(name);
            toUser && io.to(toUser.id).emit('invite_declined', {name: fromUser.name, bookId});
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
            const {name, room} = users.findById(client.id);
            if (room) {
                data.from = name;
                console.log(`${name} interacts with all users in room ${room}.`, data);
                io.broadcast.in(room).emit('interaction_received', data);
            } else {
                console.log(`${name} is in no room yet`);
            }
        });


        function removeFeed(type) {
            const user = users.findById(client.id);
            if (user && user.room) {
                io.in(user.room).emit('remove', {
                    id: user.id,
                    type: type
                });
                if (!type) {
                    client.leave(user.room);
                    user.room = undefined;
                }
            }
        }

        function joinUser({name, bookId}, cb) {
            const otherUser = users.findByName(name);

            if (otherUser) {
                const user = users.findById(client.id);

                console.log(`Found user ${otherUser.name}`);
                removeFeed();
                if (otherUser.room) {
                    console.log(`${otherUser.name} is already in room ${otherUser.room}.`);
                    console.log(`User ${user.name} joining user ${otherUser.name} in room ${otherUser.room}.`);
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
                    io.to(otherUser.id).emit('invitation_received', {
                        room: roomId,
                        name: user.name,
                        bookId
                    });
                }
            } else {
                console.log(`User ${name} not found`);
            }
        }

        // we don't want to pass "leave" directly because the
        // event type string of "socket end" gets passed too.
        client.on('disconnect', function () {
            const user = users.findById(client.id);
            if (user) {
                logoutUser(user);
                removeFeed();
                console.log(`disconnected ${client.id}`);
                users.removeUser(user.id);
            }
        });

        client.on('leave', function () {
            const user = users.findById(client.id);
            user.room = null;
            removeFeed();
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
        const origin = client.handshake.headers.origin;
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
