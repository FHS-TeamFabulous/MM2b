import io from 'socket.io-client';
import config from 'config';
import {
    createAnswerReceived,
    createOfferReceived,
    createCandidateReceived,
    createCandidate,
    createLoginSuccess,
    createLogoutSuccess,
    createInteraction,
    createRemoteStreamAdded,
    createRemoteStreamRemoved,
    createError
} from '../actions/signaling.actions';

const connectionTypes = {
    LOGIN: 'auth:login',
    LOGOUT: 'auth:logout',
    OFFER: 'signaling:offer',
    OFFER_RECEIVED: 'signaling:offerreceived',
    ANSWER: 'signaling:answer',
    ANSWER_RECEIVED: 'signaling:answerreceived',
    CANDIDATE: 'signaling:candidate',
    CANDIDATE_RECEIVED: 'signaling:candidatereceived',
    ERROR: 'signaling:error',
    CLIENTS: 'clients',
    CLIENTS_RECEIVED: 'clientsreceived',
    INTERACTION: 'interaction'
};

const DEFAULT_SOCKET = 'http://localhost:3000';

const socket = io.connect(config.server.base || DEFAULT_SOCKET);
let peerConnection;
let sendToClient;

const constraints = {
    audio: false,
    video: true
};

const getUserMedia = () => {
    return navigator.mediaDevices.getUserMedia(constraints)
        .catch(function(e) {
            alert('getUserMedia() error: ' + e.name);
        });
};

const setSteam = stream => {
    window.stream = stream;
    return stream;
};

const sendOffer = name => {
    if (sendToClient) {
        return createPeerConnection()
            .then(pc => {
                return pc.createOffer()
            })
            .then(offer => {
                peerConnection.setLocalDescription(new RTCSessionDescription(offer));
                socket.emit(connectionTypes.OFFER, {
                    name,
                    offer
                });
            });
    }

    return Promise.resolve();
};

const sendAnswer = (name, offer) => {
    return createPeerConnection()
        .then(pc => {
            pc.setRemoteDescription(new RTCSessionDescription(offer));
            return pc.createAnswer()
        })
        .then(answer => {
            peerConnection.setLocalDescription(new RTCSessionDescription(answer));
            sendToClient(connectionTypes.ANSWER)({
                answer
            });
        });
};

const sendIceCandidate = name => {
    const desc = new RTCSessionDescription(offer);

    sendToClient(connectionTypes.CANDIDATE)({
        candidate
    });
};

const addIceCandidate = data => {
    console.log('got ice candidate: ', data);
    return peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate))
};

const handleIceCandidate = event => {
    if (event.candidate && peerConnection) {
        sendToClient(connectionTypes.ANSWER)({
            candidate: event.candidate
        });
    }
};

const handleRemoteStreamAdded = event => {
    console.log('Remote stream added.');
    window.stream = event.stream;
    // dispatch(createRemoteStreamAdded(event.stream));
    /*remoteVideo.src = window.URL.createObjectURL(event.stream);
    remoteStream = event.stream;*/
};

const handleRemoteStreamRemoved = event => {
    // dispatch(createRemoteStreamRemoved());
};

export const socketApi = {
    events: connectionTypes,
    emit: (event, message) => socket.emit(event, message),
    sendOffer,
    sendAnswer,
    addIceCandidate,
};

const createPeerConnection = () => {
    const pc = new RTCPeerConnection(config.iceServers);
    pc.onicecandidate = handleIceCandidate;
    pc.onaddstream = handleRemoteStreamAdded;
    pc.onremovestream = handleRemoteStreamRemoved;

    return getUserMedia()
        .then(stream => {
            pc.addStream(stream);
            peerConnection = pc;
            return pc;
        });
};

const sendTo = name => {
    return event => {
        return data => {
            socket.emit(event, Object.assign({}, data, { name }));
        };
    };
};

export default function (dispatch, getState) {

    socket.on('connection', connection => console.log('connection: ', connection.id));
    socket.on('message', message => console.log('message: ', message));
    socket.on('disconnect', () => console.log('disconnect'));
    socket.on(connectionTypes.OFFER_RECEIVED, message => {
        const { to, from, offer } = message;
        console.log(`Client ${message.to} received OFFER from ${message.from}: `, message);
        sendToClient = sendTo(message.from);

        console.log(`${message.from} sending answer to ${message.to}`);
        sendAnswer(message.to, message.offer);
    });
    socket.on(connectionTypes.ANSWER_RECEIVED, message => {
        const { to, from, answer } = message;
        console.log(`Client ${message.to} received: `, message);
        if (peerConnection) {
            peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
        } else {
            createPeerConnection()
                .then(pc => {
                    pc.setRemoteDescription(new RTCSessionDescription(answer));
                });
        }
        // dispatch(createAnswerReceived(data));
    });
    socket.on(connectionTypes.CANDIDATE_RECEIVED, data => {
        let candidate = new RTCIceCandidate(data.candidate);

        peerConnection.addIceCandidate(candidate);
        dispatch(createCandidateReceived(data));
    });
    socket.on(connectionTypes.INTERACTION, data => {
        dispatch(createInteraction(data));
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
        // dispatch(createError(error));
    });
}
