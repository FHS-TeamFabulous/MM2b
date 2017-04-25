const socketIO = require('socket.io'),
    users = {};

function sendTo(conn) {
    return (message) => {
        conn.emit('message', message);
    };

}

const connectionTypes = {
    LOGIN: 'login',
    LOGOUT: 'logout',
    OFFER: 'offer',
    ANSWER: 'answer',
    CANDIDATE: 'candidate',
};

module.exports = function (server) {
    const io =socketIO(server);

    const extractData = message => {
        let data;
        try {
            data = JSON.parse(message);
        } catch (e) {
            console.log('Invalid JSON message');
            data = {};
        }
        return data;
    };

    /*const isValidMessage = (message, condition = true) => message.name && condition;
    const isOfferMessage = message => isValidMessage(message, message.offer);
    const isAnswerMessage = message => isValidMessage(message, message.answer);
    const isCandidateMessage = message => isValidMessage(message, message.candidate);*/

    io.on('connection', connection => {

        console.log('connected: ' + connection.id);
        console.log('clients logged in: ', Object.keys(users));
        const clientSender = sendTo(connection);

        clientSender({
            type: 'clients',
            clients: Object.keys(users)
        });
        // pass a message to another id
        connection.on('message', data => {

            const handleLogin = data => {
                const {
                    name
                } = data;

                console.log(`User logging in ${name}`);

                if (users[name]) {
                    console.log(`${name} already logged in`);
                    clientSender( {
                        type: connectionTypes.LOGIN,
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

                    clientSender({
                        type: connectionTypes.LOGIN,
                        success: true,
                        clients: Object.keys(users)
                    });
                }
            };

            const handleLogout = data => {
                const {
                    name
                } = data;

                console.log("Disconnecting from", name);

                const conn = users[name];
                conn.otherName = null;

                delete users[name];

                //notify the other user so he can disconnect his peer connection
                if (conn != null) {
                    clientSender({
                        type: connectionTypes.LOGOUT,
                        success: true
                    });
                } else {
                    clientSender({
                        type: connectionTypes.LOGOUT,
                        success: false
                    });
                }
            };

            const handleOffer = data => {
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

                    sendTo(conn)({
                        type: connectionTypes.OFFER,
                        offer,
                        name: connection.name
                    });
                } else {
                    clientSender({
                        type: 'error',
                        message: `[OFFER] Connection ${name} not found`
                    })
                }

            };

            const handleAnswer = data => {
                const {
                    name,
                    answer
                } = data;

                console.log("Sending answer to: ", data.name);

                //for ex. UserB answers UserA
                const conn = users[name];

                if (conn != null) {
                    connection.otherName = name;
                    sendTo(conn)({
                        type: connectionTypes.ANSWER,
                        answer
                    });
                } else {
                    clientSender({
                        type: 'error',
                        message: `[ANSWER] Connection ${name} not found`
                    });
                }
            };

            const handleCandidate = data => {
                const {
                    name,
                    candidate
                } = data;

                console.log("Sending candidate to:", data.name);

                const conn = users[name];

                if (conn != null) {
                    sendTo(conn)({
                        type: connectionTypes.CANDIDATE,
                        candidate
                    });
                } else {
                    clientSender({
                        type: 'error',
                        message: `[CANDIDATE] Connection ${name} not found`
                    });
                }
            };

            switch (data.type) {
                case connectionTypes.LOGIN:
                    handleLogin(data);
                    break;
                case connectionTypes.LOGOUT:
                    handleLogout(data);
                    break;
                case connectionTypes.OFFER:
                    handleOffer(data);
                    break;
                case connectionTypes.ANSWER:
                    handleAnswer(data);
                    break;
                case connectionTypes.CANDIDATE:
                    handleCandidate(data);
                    break;
                default:
                    clientSender({type: 'error', message: `Invalid message type (${data.type}`})
            }
        });

        connection.on('shareScreen', function () {
            connection.resources.screen = true;
        });

        connection.on('unshareScreen', function (type) {
            connection.resources.screen = false;
            removeFeed('screen');
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

