const socketIO = require('socket.io');
const messageTypes = require('../shared/message-types');
const Users = require('./users');
const config = require('config');
const crypto = require('crypto');
const uuid = require('uuid');

module.exports = function (http) {
    const io = socketIO(http);

    io.on('connection', (socket) => {
        console.log('a user connected', socket.id);

        bindListeners(socket);
    });

    function bindListeners(socket) {
        /**
         * Incoming messages
         */
        socket.on('disconnect', () => {
            const user = Users.get(socket.id);

            if (user) {
                Users.remove(user.id);
                broadCastClientsUpdate();
            }

            console.log('a user disconnected', socket.id);
        });

        socket.on(messageTypes.LOGIN, (loginData) => {
            const userData = {
                socket, 
                id: socket.id,
                name: loginData.userName,
            };

            const user = Users.create(userData);
            
            sendLoginSuccess(user);
            broadCastClientsUpdate();
        });

        socket.on(messageTypes.INVITATION_SEND, (invitationData) => {
            const receiver = Users.get(invitationData.receiverId);
            const sender = Users.get(socket.id);
            const bookId = invitationData.bookId;

            if (receiver) {
                forwardInvitation(sender, receiver, bookId);
            }
        });

        socket.on(messageTypes.INVITATION_CANCEL, (cancelInvData) => {
            const receiver = Users.get(cancelInvData.receiverId);
            const sender = Users.get(socket.id);

            if (receiver) {
                forwardInvitationCancel(sender, receiver);
            }
        });

        socket.on(messageTypes.INVITATION_ACCEPT, (acceptInvData) => {
            const receiver = Users.get(acceptInvData.receiverId);
            const sender = Users.get(socket.id);
            const bookId = acceptInvData.bookId;

            if (receiver) {
                forwardInvitationAccept(sender, receiver, bookId);
            }
        });

        socket.on(messageTypes.INVITATION_DECLINE, (declineInvData) => {
            const receiver = Users.get(declineInvData.receiverId);
            const sender = Users.get(socket.id);

            if (receiver) {
                forwardInvitationDecline(sender, receiver);
            }
        });

        socket.on(messageTypes.READER_LEAVE, (leavingData) => {
            const sender = Users.get(socket.id);
            const receiver = Users.get(leavingData.receiverId);

            if (receiver) {
                forwardReaderLeave(sender, receiver);
            }
        });

        /**
         * Outgoing messages
         */
        function sendLoginSuccess(user) {
            socket.emit(messageTypes.LOGIN_SUCCESS, {
                user: user.toJSON(),
                clients: Users.toJSON().filter(user => (user.id !== socket.id))
            });
        }

        function broadCastClientsUpdate() {
            socket.broadcast.emit(messageTypes.CLIENTS_UPDATE, { 
                clients: Users.toJSON()
            });
        }

        function forwardInvitation(sender, receiver, bookId) {
            receiver.socket.emit(messageTypes.INVITATION_RECEIVED, { 
                sender: sender.toJSON(), 
                bookId 
            });
        }

        function forwardInvitationCancel(sender, receiver) {
            receiver.socket.emit(messageTypes.INVITATION_CANCELED, { 
                sender: sender.toJSON()
            });
        }

        function forwardInvitationAccept(sender, receiver, bookId) {
            receiver.socket.emit(messageTypes.INVITATION_ACCEPTED, { 
                sender: sender.toJSON(), 
                bookId 
            });
        }

        function forwardInvitationDecline(sender, receiver) {
            receiver.socket.emit(messageTypes.INVITATION_DECLINED, { 
                sender: sender.toJSON()
            });
        }

        function forwardReaderLeave(sender, receiver) {
            receiver.socket.emit(messageTypes.READER_LEFT, { 
                sender: sender.toJSON()
            });
        }

        // create shared secret nonces for TURN authentication
        // the process is described in draft-uberti-behave-turn-rest
        const credentials = [];
        // allow selectively vending turn credentials based on origin.
        const origin = socket.handshake.headers.origin;
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
        socket.emit('turnservers', credentials);
    }
};
