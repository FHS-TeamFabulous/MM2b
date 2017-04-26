const types = {
    LOGIN: 'LOGGING_IN'
};

function logIn(username) {
    return {
        type: types.LOGIN,
        payload: {
            user: username
        }

    }
}

export { types, logIn };
