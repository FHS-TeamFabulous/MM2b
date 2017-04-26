import { combineEpics } from 'redux-observable';
import { loginEpic, logoutEpic, offerEpic } from '../actions/signaling.actions';
import { types } from '../actions/signaling.actions';

const initialState = {
    id: undefined,
    constraints: {
        video: true,
        audio: false
    },
    description: {},
    clients: [],
    user: null,
    connected: false,
    error: {}
};

export const signalingReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.LOGIN_SUCCESS:
            return Object.assign({}, state, { user: action.payload.name });
        case types.CHANGE_DESCRIPTION:
            return Object.assign({}, state, { description: action.payload });
        case types.CLIENTS:
            return Object.assign({}, state, { clients: action.payload });
        case types.ERROR:
            return Object.assign({}, state, { error: action.payload });
        default:
            return state;
    }
};

export const signalingEpics = combineEpics(
    loginEpic,
    logoutEpic,
    offerEpic
);


