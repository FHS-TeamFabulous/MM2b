import {} from 'redux-observable';

export const types = {
    OFFER: '[client] OFFER',
    ANSWER: '[client] ANSWER',
    CANDIDATE: '[client] CANDIDATE',
    LOGIN: '[client] LOGIN',
    LOGOUT: '[client] LOGOUT'
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

export const offerEpic = action$ =>
    action$.filter(action => action.type === types.OFFER)
        .switchMap(action => {
            createAnswer('test', 'testAnswer')
        });

