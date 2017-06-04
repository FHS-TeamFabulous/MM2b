const app = require('../server/index');
const io = require('socket.io-client');
const should = require('should');
const messageTypes = require('../shared/message-types');
const url = 'http://localhost:3000';

let clientA,
    clientB;

describe('test login', () => {
    beforeEach(() => {
        clientA = io.connect(url);
        clientB = io.connect(url);
    });
    afterEach(() => {
        clientA.disconnect();
        clientB.disconnect();
    });
    it('should login successfully', (done) => {
        clientA.emit(messageTypes.LOGIN, { userName: 'Paul' });

        clientA.on(messageTypes.LOGIN_SUCCESS, (response) => {
            response.user.name.should.equal('Paul');
            done();
        });
    });
    it('should update clients and notify users', (done) => {
        clientA.emit(messageTypes.LOGIN, { userName: 'Paul' });

        clientA.on(messageTypes.CLIENTS_UPDATE, (response) => {
            const { clients } = response;
            clients.should.not.be.empty();
            clients.should.be.an.Array();
            done();
        });

        clientA.on(messageTypes.LOGIN_SUCCESS, (response) => {
            response.user.name.should.equal('Paul');
            clientB.emit(messageTypes.LOGIN, { userName: 'Markus' });
        });
    });
});
