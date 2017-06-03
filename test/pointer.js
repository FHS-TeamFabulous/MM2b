/**
 * Created by Maxi on 03.06.17.
 */
const io = require('socket.io-client');
const should = require('should');
const messageTypes = require('../shared/message-types');
const url = 'http://localhost:3000';

let clientA, clientB;
let userA, userB;

describe('test pointer', function () {
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

    it('pointer should enable', function (done) {
        const data = {
            position: 2,
            receiverId: userB.id
        };

        clientA.emit(messageTypes.POINTER_ENABLE, data);

        clientB.on(messageTypes.POINTER_ENABLED, response => {
            const {sender, position} = response;
            sender.id.should.equal(userA.id);
            position.should.equal(2);
            done();
        });


    });

    it('pointer should disable', function (done) {
        const data = {
            receiverId: userB.id
        };

        clientA.emit(messageTypes.POINTER_DISABLE, data);

        clientB.on(messageTypes.POINTER_DISABLED, response => {
            const {sender} = response;
            sender.id.should.equal(userA.id);
            done();
        });

    });

    it('pointer should move', function (done) {
        const data = {
            position: 2,
            receiverId: userB.id
        };

        clientA.emit(messageTypes.POINTER_MOVE, data);

        clientB.on(messageTypes.POINTER_MOVED, response => {
            const {sender, position} = response;
            sender.id.should.equal(userA.id);
            position.should.equal(2);
            done();
        });

    });
});
