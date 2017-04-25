import {} from 'redux-observable';

export const types = {
    OFFER: '[video] OFFER',
    ANSWER: '[video] ANSWER',
    CANDIDATE: '[video] CANDIDATE',
    LOGIN: '[video] LOGIN',
    LOGOUT: '[video] LOGOUT'
};

export function createOffer(name) {
    return {
        action: types.OFFER,
        payload: {
            name
        }
    };
}

export function createAnswer(name) {
    return {
        action: types.ANSWER,
        payload: {
            name
        }
    };
}

export function createCandidate(name, candidate) {
    return {
        action: types.CANDIDATE,
        payload: {
            name
        }
    }
}

export function createLogin(name) {
    return {
        action: types.LOGIN,
        payload: {
            name
        }
    };
}

export function createLogout(name) {
    return {
        action: types.LOGOUT,
        payload: {
            name
        }
    }
}

/*export const offerEpic = action$ =>
    action$.filter(action => action.type === types.OFFER);*/

