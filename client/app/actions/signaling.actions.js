import { socketApi } from '../services/socket';


export const types = {
    CHANGE_DESCRIPTION: '[communication] CHANGE DESCRIPTION',
    OFFER: '[communication] OFFER',
    OFFER_SENT: '[communcation] OFFER SUCCESS',
    OFFER_RECEIVED: '[communication] OFFER RECEIVED',
    ANSWER: '[communication] ANSWER',
    ANSWER_SENT: '[communication] ANSWER SUCCESS',
    ANSWER_RECEIVED: '[communication] ANSWER REVEIVED',
    CANDIDATE: '[communication] CANDIDATE',
    CANDIDATE_SENT: '[communication] CANDIDATE SENT',
    CANDIDATE_RECEIVED: '[communication] CANDIDATE RECEIVED',
    CANDIDATE_SET: '[communication] CANDIDATE SET',
    LOGIN: '[communication] LOGIN',
    LOGIN_SENT: '[communication] LOGIN SENT',
    LOGIN_SUCCESS: '[communication] LOGIN SUCCESS',
    LOGOUT: '[communication] LOGOUT',
    LOGOUT_SENT: '[communication] LOGOUT SENT',
    LOGOUT_SUCCESS: '[communication] LOGOUT SUCCESS',
    CLIENTS: '[communication] CLIENTS',
    CONNECT: '[communication] CONNECT',
    CONNECTED: '[communication] CONNECTED',
    INTERACTION: '[communication] INTERACTION',
    REMOTE_STREAM_ADDED: '[communication] REMOTE STREAM ADDED',
    REMOTE_STREAM_REMOVED: '[communication] REMOTE STREAM REMOVED'
};

export function createClientsReceived(clients) {
    return {
        type: types.CLIENTS,
        payload: clients
    };
}

export function createOffer(name) {
    return {
        type: types.OFFER,
        payload: {
            name
        }
    };
}

export function createOfferSent(name) {
    return {
        type: types.OFFER_SENT,
        payload: {
            name
        }
    };
}

export function createOfferReceived(message) {
    return {
        type: types.OFFER_RECEIVED,
        payload: message
    };
}

export function createAnswerSent(name) {
    return {
        type: types.ANSWER_SENT,
        payload: {
            name
        }
    };
}

export function createAnswerReceived(data) {
    return {
        type: types.ANSWER_RECEIVED,
        payload: data
    };
}

export function createCandidate(name) {
    return {
        type: types.CANDIDATE,
        payload: {
            name
        }
    };
}

export function createCandidateSent() {
    return {
        type: types.CANDIDATE_SENT
    };
}

export function createCandidateSet(candidate) {
    return {
        type: types.CANDIDATE_SET,
        payload: {
            candidate
        }
    }
}

export function createCandidateReceived(data) {
    return {
        type: types.CANDIDATE_RECEIVED,
        payload: data
    };
}

export function createLogin(name) {
    return {
        type: types.LOGIN,
        payload: {
            name
        }
    };
}

export function createLoginSent(name) {
    return {
        type: types.LOGIN_SENT,
        payload: {
            name
        }
    };
}

export function createLoginSuccess(name) {
    return {
        type: types.LOGIN_SUCCESS,
        payload: {
            name
        }
    }
}

export function createLogout(name) {
    return {
        type: types.LOGOUT,
        payload: {
            name
        }
    };
}

export function createLogoutSent() {
    return {
        type: types.LOGOUT_SENT
    }
}

export function createLogoutSuccess(name) {
    return {
        type: types.LOGOUT_SUCCESS,
        payload: {
            name
        }
    };
}

export function createChangeDescrition(description) {
    return {
        type: types.CHANGE_DESCRIPTION,
        payload: description
    };
}

export function createConnected() {
    return {
        type: types.CONNECTED
    };
}

export function createConnect(name) {
    return {
        type: types.CONNECT,
        payload: {
            name
        }
    };
}

export function createRemoteStreamAdded(stream) {
    return {
        type: types.REMOTE_STREAM_ADDED,
        payload: {
            stream
        }
    }
}

export function createRemoteStreamRemoved() {
    return {
        type: types.REMOTE_STREAM_REMOVED
    }
}

export function createInteraction(data) {
    return {
        type: types.INTERACTION,
        payload: data
    }
}

export function createError(error) {
    return {
        type: types.ERROR,
        payload: error
    };
}

export const loginEpic = (action$, state) => action$
    .filter(action => action.type === types.LOGIN)
    .map(action => action.payload)
    .map(message => {
        socketApi.emit(socketApi.events.LOGIN, message);
        return message;
    })
    .map(createLoginSent);

export const logoutEpic = (action$, state) => action$
    .filter(action => action.type === types.LOGOUT)
    .map(action => action.payload)
    .map(name => socketApi.emit(socketApi.events.LOGOUT))
    .mapTo(createLogoutSent());

export const offerEpic = (action$, state) => action$
    .filter(action => action.type === types.OFFER)
    .map(action => action.payload)
    .switchMap(message => socketApi.sendOffer(message.name)
        .then(() => createOfferSent(message.name))
    );

/*export const answerEpic = (action$, state) => action$
    .filter(action => action.type === types.OFFER_RECEIVED)
    .map(action => action.payload)
    .switchMap(({name, offer}) => socketApi.sendAnswer(name, offer)
        .then(() => createAnswerSent(name))
    );

export const candidateEpic = (action$, state) => action$
    .filter(action => action.type === types.CANDIDATE)
    .map(action => action.payload)
    .map(data => {
        console.log(state);
        // socketApi.sendCandidate(data);
    })
    .mapTo(createCandidateSent());

export const candidateReceivedEpic = (action$, state) => action$
    .filter(action => action.type === types.CANDIDATE_RECEIVED)
    .map(action => action.payload)
    .map(message => {
        socketApi.addIceCandidate(message);
        return message.candidate;
    })
    .map(createCandidateSet);*/
