import * as authActions from 'app/actions/auth';

const initialState = {
    user: {},
    clients: [],
    isLoggedIn: false
};

function clientDecorator(clients = []) {
    return clients.map((client) => {
        const IMAGE_COUNT = 5;
        const rndAvatarIdx = Math.floor(Math.random() * IMAGE_COUNT);

        return Object.assign({}, client, { avatar: `/images/avatars/${rndAvatarIdx}.jpg` });
    });
}

function authReducer(state = initialState, action) {
    switch (action.type) {
    case authActions.types.AUTH_LOGIN_SUCCESS:
        return Object.assign({}, state, {
            isLoggedIn: true,
            user: action.user,
            clients: clientDecorator(action.clients)
        });

    case authActions.types.AUTH_CLIENTS_UPDATE:
        return Object.assign({}, state, {
            clients: clientDecorator(action.clients)
        });
    default:
        return state;
    }
}

export default authReducer;
