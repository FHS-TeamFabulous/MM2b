import * as socketActions from 'app/actions/socket';

export const types = {
    AUTH_LOGIN_SUCCESS: 'AUTH_LOGIN_SUCCESS',
    AUTH_CLIENTS_UPDATE: 'AUTH_CLIENTS_UPDATE'
};

export function login(userName) {
    return (dispatch) => {
        dispatch(socketActions.login(userName));
    };
}

export function setAuthData(user, clients) {
    return {
        type: types.AUTH_LOGIN_SUCCESS,
        user,
        clients
    };
}

export function updateClients(clients) {
    return {
        type: types.AUTH_CLIENTS_UPDATE,
        clients
    };
}
