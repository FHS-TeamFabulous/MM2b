const socketio = require('socket.io');

function listen(http) {
    const io = socketio.listen(http);

    io.on('connection', socket => {
        console.log(`Hello User! id: ${socket.id}`);
    });
}

module.exports = { listen };
