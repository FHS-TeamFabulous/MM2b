/**
 * Created by Maxi on 03.06.17.
 */
const io = require('socket.io-client');
const should = require('should');
const messageTypes = require('../shared/message-types');
const url = 'http://localhost:3000';

let clientA,
    clientB;
let userA,
    userB;

describe('test pointer', () => {
    beforeEach((done) => {
        clientA = io.connect(url);
        clientB = io.connect(url);

        clientA.emit(messageTypes.LOGIN, { userName: 'Agathe' });

        clientA.on(messageTypes.LOGIN_SUCCESS, (response) => {
            response.user.name.should.equal('Agathe');

            userA = response.user;

            clientB.emit(messageTypes.LOGIN, { userName: 'Berthold' });
        });

        clientB.on(messageTypes.LOGIN_SUCCESS, (response) => {
            response.user.name.should.equal('Berthold');

            userB = response.user;

            done();
        });
    });

    afterEach(() => {
        clientA.disconnect();
        clientB.disconnect();
    });

    it('pointer should enable', (done) => {
        const data = {
            position: { x: 5, y: 5 },
            receiverId: userB.id
        };

        clientA.emit(messageTypes.POINTER_ENABLE, data);

        clientB.on(messageTypes.POINTER_ENABLED, (response) => {
            const { sender, position } = response;
            sender.id.should.equal(userA.id);
            position.x.should.equal(5);
            position.y.should.equal(5);
            done();
        });
    });

    it('pointer should disable', (done) => {
        const data = {
            receiverId: userB.id
        };

        clientA.emit(messageTypes.POINTER_DISABLE, data);

        clientB.on(messageTypes.POINTER_DISABLED, (response) => {
            const { sender } = response;
            sender.id.should.equal(userA.id);
            done();
        });
    });

    it('pointer should move', (done) => {
        const data = {
            position: { x: 5, y: 5 },
            receiverId: userB.id
        };

        clientA.emit(messageTypes.POINTER_MOVE, data);

        clientB.on(messageTypes.POINTER_MOVED, (response) => {
            const { sender, position } = response;
            sender.id.should.equal(userA.id);
            position.x.should.equal(5);
            position.y.should.equal(5);
            done();
        });
    });
});
