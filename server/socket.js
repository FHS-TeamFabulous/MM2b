const socketIO = require('socket.io'),
    users = {};

function sendTo(conn) {
    return event => {
        return message => {
            conn.emit(event, message);
        };
    }
}

const connectionTypes = {
    LOGIN: 'auth:login',
    LOGOUT: 'auth:logout',
    OFFER: 'signaling:offer',
    ANSWER: 'signaling:answer',
    CANDIDATE: 'signaling:candidate',
    ERROR: 'signaling:error',
    CLIENTS: 'clients',
    INTERACTION: 'interaction'
};

module.exports = function (server) {
    const io =socketIO(server);

    io.on('connection', connection => {

        console.log('connected: ' + connection.id);
        console.log('clients logged in: ', Object.keys(users));

        const clientSender = sendTo(connection);
        const clientOfferSender = clientSender(connectionTypes.OFFER);
        const clientAnswerSender = clientSender(connectionTypes.ANSWER);
        const clientCandidateSender = clientSender(connectionTypes.CANDIDATE);
        const clientLoginSender = clientSender(connectionTypes.LOGIN);
        const clientLogoutSender = clientSender(connectionTypes.LOGOUT);
        const clientErrorSender = clientSender(connectionTypes.ERROR);
        const clientClientsSender = clientSender(connectionTypes.CLIENTS);

        clientSender({
            type: 'clients',
            clients: Object.keys(users)
        });

        connection.on(connectionTypes.LOGIN, data => {
            const {
                name
            } = data;

            console.log(`User logging in ${name}`);

            if (users[name]) {
                console.log(`${name} already logged in`);
                clientErrorSender( {
                    success: false
                });
            } else {
                connection.resources = {
                    screen: false,
                    video: true,
                    audio: false
                };
                connection.name = name;
                users[name] = connection;

                clientLoginSender({
                    name,
                    success: true
                });
                clientClientsSender({
                    clients: Object.keys(users)
                })
            }
        });

        connection.on(connectionTypes.LOGOUT, data => {
            const {
                name
            } = data;

            console.log("Disconnecting from", name);

            const conn = users[name];
            conn.otherName = null;

            delete users[name];

            //notify the other user so he can disconnect his peer connection
            if (conn != null) {
                clientLogoutSender({
                    name,
                    success: true
                });
            } else {
                clientErrorSender({
                    success: false
                });
            }
        });

        connection.on(connectionTypes.OFFER, data => {
            const {
                name,
                offer
            } = data;

            console.log("Sending offer to: ", name);

            //if UserB exists then send him offer details
            const conn = users[name];

            if (conn != null) {
                //setting that UserA connected with UserB
                connection.otherName = name;

                sendTo(conn)(connectionTypes.OFFER)({
                    offer,
                    name: connection.name
                });
            } else {
                console.log(`${name} is not yet connected`);
                clientErrorSender({
                    message: `[OFFER] Connection ${name} not found`
                })
            }

        });

        connection.on(connectionTypes.ANSWER, data => {
            const {
                name,
                answer
            } = data;

            console.log("Sending answer to: ", data.name);

            //for ex. UserB answers UserA
            const conn = users[name];

            if (conn != null) {
                connection.otherName = name;
                sendTo(conn)(connectionTypes.ANSWER)({
                    name,
                    answer
                });
            } else {
                clientErrorSender({
                    message: `[ANSWER] Connection ${name} not found`
                });
            }
        });

        connection.on(connectionTypes.CANDIDATE, data => {
            const {
                name,
                candidate
            } = data;

            console.log("Sending candidate to:", data.name);

            const conn = users[name];

            if (conn != null) {
                sendTo(conn)(connectionTypes.CANDIDATE)({
                    name,
                    candidate
                });
            } else {
                clientErrorSender({
                    message: `[CANDIDATE] Connection ${name} not found`
                });
            }
        });

        // pass a message to another id
        connection.on('interation', data => {
            const {
                name,
            } = data;

            console.log("Sending interaction to: ", name);

            //if UserB exists then send him offer details
            const conn = users[name];

            if (conn != null) {
                sendTo(conn)(connectionTypes.INTERACTION)(data);
            } else {
                console.log(`${name} is not yet connected`);
                clientErrorSender({
                    message: `[INTERACTION] Connection ${name} not found`
                })
            }
        });

        connection.on('shareScreen', function () {
            connection.resources.screen = true;
        });

        connection.on('unshareScreen', function (type) {
            connection.resources.screen = false;
        });

        connection.on("disconnect", function() {
            console.log('disconnect');
            if(connection.name) {
                console.log(`Disconnecting ${connection.name}`);
                delete users[connection.name];

                if(connection.otherName) {
                    console.log("Disconnecting from ", connection.otherName);
                    var conn = users[connection.otherName];
                    conn.otherName = null;

                    if(conn != null) {
                        sendTo(conn, {
                            type: "leave"
                        });
                    }
                }
            }

            console.log(Object.keys(users));
        });
    });
};

