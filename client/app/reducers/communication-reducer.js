import { combineEpics } from 'redux-observable';

import { types } from 'app/actions/communication-actions';
import {
    loginEpic,
    logoutEpic,
    connectEpic,
    connectOnInvitation,
    interactEpic
} from 'app/epics/communication-epics';


const initialState = {
    id: undefined,
    clients: [],
    connected: false
};

export const communicationReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.CLIENTS_RECEIVED:
            return Object.assign({}, state, { clients: action.payload });
        default:
            return state;
    }
};

export const communicationEpics = combineEpics(
    loginEpic,
    logoutEpic,
    connectEpic,
    connectOnInvitation,
    interactEpic
);


