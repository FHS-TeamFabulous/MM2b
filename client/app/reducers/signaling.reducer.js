import { combineEpics } from 'redux-observable';
import { types } from '../actions/signaling.actions';
import {
    loginEpic,
    logoutEpic,
    offerEpic,
    /*answerEpic,
    candidateEpic,
    candidateReceivedEpic*/
} from '../actions/signaling.actions';


const initialState = {
    id: undefined,
    constraints: {
        video: true,
        audio: false
    },
    video: {},
    description: {},
    clients: [],
    user: null,
    connection: {
        connected: false,
        name: '',
        offering: '',
    },
    error: {}
};

export const signalingReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.LOGIN_SUCCESS:
            return Object.assign({}, state, { user: action.payload.name });
        case types.OFFER_SENT:
            return Object.assign({}, state, { connection: { offering: action.payload.name }});
        case types.REMOTE_STREAM_ADDED:
            return Object.assign({}, state,
                {
                    video: {
                        stream: action.payload.stream,
                        src: window.URL.createObjectURL(action.payload.stream)
                    }
                }
            );
        case types.CONNECTED:
            return Object.assign({}, state, {
                connected: true
            });
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
    offerEpic,
    /*answerEpic,
    candidateEpic,
    candidateReceivedEpic*/
);


