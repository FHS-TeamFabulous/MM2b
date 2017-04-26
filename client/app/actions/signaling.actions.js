import { socketApi } from '../services/socket';
import { Observable } from 'rxjs';


export const types = {
    CHANGE_DESCRIPTION: '[communication] CHANGE DESCRIPTION',
    OFFER: '[communication] OFFER',
    OFFER_SENT: '[communcation] OFFER SUCCESS',
    OFFER_RECEIVED: '[communication] OFFER RECEIVED',
    ANSWER: '[communication] ANSWER',
    ANSWER_SENT: '[communication] ANSWER SUCCESS',
    CANDIDATE: '[communication] CANDIDATE',
    CANDIDATE_SENT: '[communication] CANDIDATE SENT',
    LOGIN: '[communication] LOGIN',
    LOGIN_SENT: '[communication] LOGIN SENT',
    LOGIN_SUCCESS: '[communication] LOGIN SUCCESS',
    LOGOUT: '[communication] LOGOUT',
    LOGOUT_SENT: '[communication] LOGOUT SENT',
    LOGOUT_SUCCESS: '[communication] LOGOUT SUCCESS',
    CLIENTS: '[communication] CLIENTS',
    CONNECT: '[communication] CONNECT',
    CONNECTED: '[communication] CONNECTED'
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

export function createOfferSent() {
    return {
        type: types.OFFER_SENT
    };
}

export function createOfferReceived(message) {
    return {
        type: types.OFFER_RECEIVED,
        payload: message
    };
}

export function createAnswered(name) {
    return {
        type: types.ANSWER,
        payload: {
            name
        }
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
    .map(message => {
        socketApi.offer(message.name);
    })
    .mapTo(createOfferSent());

export const answerEpic = (action$, state) => action$
    .filter(action => action.type === types.OFFERED)
    .map(action => action.payload)
    .map(({name, offer}) => {
        socketApi.answer(name, offer);
        return name;
    })
    .map(createAnswered);
