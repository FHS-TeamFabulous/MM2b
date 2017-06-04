const io = require('socket.io-client');
const should = require('should');
const messageTypes = require('../shared/message-types');
const url = 'http://localhost:3000';

let clientA, clientB;
let userA, userB;

describe('test invitation', function () {
    beforeEach(function (done) {
        clientA = io.connect(url);
        clientB = io.connect(url);

        clientA.emit(messageTypes.LOGIN, {userName: 'Agathe'});

        clientA.on(messageTypes.LOGIN_SUCCESS, (response) => {
            response.user.name.should.equal('Agathe');

            userA = response.user;

            clientB.emit(messageTypes.LOGIN, {userName: 'Berthold'});
        });

        clientB.on(messageTypes.LOGIN_SUCCESS, (response) => {
            response.user.name.should.equal('Berthold');

            userB = response.user;

            done();
        });
    });

    afterEach(function () {
        clientA.disconnect();
        clientB.disconnect();
    });

    // inivation cancelled
    // invitation declined
    it('invitation should succeed', function (done) {
        const data = {
            receiverId: userB.id,
            bookId: 'Foxy-Joxy-Plays-A-Trick'
        };

        clientA.emit(messageTypes.INVITATION_SEND, data);

        let room;

        clientB.on(messageTypes.INVITATION_RECEIVED, response => {
            const {sender, bookId, roomId} = response;
            sender.id.should.equal(userA.id);
            bookId.should.equal(data.bookId);

            room = roomId;

            clientB.emit(messageTypes.INVITATION_ACCEPT, {receiverId: sender.id, bookId, roomId});
        });

        clientA.on(messageTypes.INVITATION_ACCEPTED, response => {
            response.sender.id.should.equal(data.receiverId);
            response.bookId.should.equal(data.bookId);
            response.roomId.should.equal(room);

            done();
        });
    });

    it('invitation should be declined', function (done) {
        const data = {
            receiverId: userB.id,
            bookId: 'Foxy-Joxy-Plays-A-Trick'
        };

        clientA.emit(messageTypes.INVITATION_SEND, data);

        clientB.on(messageTypes.INVITATION_RECEIVED, response => {
            const {sender, bookId, roomId} = response;
            sender.id.should.equal(userA.id);
            bookId.should.equal(data.bookId);

            clientB.emit(messageTypes.INVITATION_DECLINE, {receiverId: sender.id, bookId, roomId});
        });

        clientA.on(messageTypes.INVITATION_DECLINED, response => {
            response.sender.id.should.equal(data.receiverId);
            done();
        });
    });

    it('should cancel the invitation', function (done) {
        this.timeout(10000);

        const data = {
            receiverId: userB.id,
            bookId: 'Foxy-Joxy-Plays-A-Trick'
        };

        clientA.emit(messageTypes.INVITATION_SEND, data);

        clientB.on(messageTypes.INVITATION_RECEIVED, response => {
            const {sender, bookId} = response;
            sender.id.should.equal(userA.id);
            bookId.should.equal(data.bookId);
        });

        clientB.on(messageTypes.INVITATION_CANCELED, response => {
            response.sender.id.should.equal(userA.id);
            done();
        });

        setTimeout(() => {
            clientA.emit(messageTypes.INVITATION_CANCEL, {receiverId: data.receiverId});
        }, 5000);
    });
});
