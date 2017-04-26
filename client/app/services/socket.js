import io from 'socket.io-client';
import config from 'config';
import {
    createAnswerSuccess,
    createOfferReceived,
    createLoginSuccess,
    createLogoutSuccess,
    createError
} from '../actions/signaling.actions';

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

const DEFAULT_SOCKET = 'http://localhost:3000';

const socket = io.connect(config.server.base || DEFAULT_SOCKET);
const peerConnection = new RTCPeerConnection();

const offer = name => {
    return peerConnection.createOffer()
        .then(offer => {
            peerConnection.setLocalDescription(offer);
            socket.emit(connectionTypes.OFFER, {
                name,
                offer
            });
        });

};

const answer = (name, offer) => {
    peerConnection.setRemoteDescription(offer);
    return peerConnection.createAnswer()
        .then(answer => {
            peerConnection.setLocalDescription(answer);
            socket.emit(connectionTypes.ANSWER, {
                name,
                answer
            });
        });
};

export const ConnectionApi = {
    peerConnection,

};

export const socketApi = {
    events: connectionTypes,
    emit: (event, message) => socket.emit(event, message),
    offer,
    answer
};

export default function (dispatch, getState) {

    socket.on('connection', connection => console.log('connection: ', connection.id));
    socket.on('message', message => console.log('message: ', message));
    socket.on('disconnect', () => console.log('disconnect'));
    socket.on(connectionTypes.OFFER, message => {
        dispatch(createOfferReceived(message));
    });
    socket.on(connectionTypes.ANSWER, ({name, answer}) => {
        peerConnection.setRemoteDescription(answer);
        dispatch(createAnswerSuccess());
    });
    socket.on(connectionTypes.INTERACTION, message => {

    });
    socket.on(connectionTypes.LOGIN, ({name, success}) => {
        if (success) {
            dispatch(createLoginSuccess(name))
        } else {
            dispatch(createError({ message: 'login error'}))
        }
    });
    socket.on(connectionTypes.LOGOUT, ({name, success}) => {
        if (success) {
            dispatch(createLogoutSuccess(name))
        } else {
            dispatch(createError({ message: 'logout error'}))
        }
    });
    socket.on(connectionTypes.ERROR, error => {
        dispatch(createError(error));
    });
}
