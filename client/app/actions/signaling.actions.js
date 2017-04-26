import Communication from 'app/services/communication';


export const types = {
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
};

export function createClientsReceived(clients) {
    return {
        type: types.CLIENTS,
        payload: clients
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

export const connectEpic = (action$, state) => action$
    .filter(action => action.type === types.CONNECT)
    .map(action => action.payload)
    .switchMap(({name}) => Communication.joinRoom(name)
        .then(() => createConnected())
    );
