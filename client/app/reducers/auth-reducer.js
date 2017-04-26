import { types } from 'app/actions/auth-actions';

const initialState = {
    isLoggedIn: false,
    username: ""
};

function authReducer(state = initialState, action) {

    switch (action.type) {
        case types.LOGIN:
            //console.log(action.payload.user);
            return Object.assign({}, state, {
                isLoggedIn: true,
                username: action.payload.user
            });
    }

    return state;
}

export default authReducer;
