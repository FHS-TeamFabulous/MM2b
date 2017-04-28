import { combineEpics } from 'redux-observable';

import { types } from 'app/actions/communication-actions';
import {
    loginEpic,
    logoutEpic,
    connectEpic,
    inviteEpic,
    declineInvitationEpic,
    acceptInvitationEpic,
    interactEpic
} from 'app/epics/communication-epics';


const initialState = {
    id: undefined,
    clients: [],
    connected: false,
    isInviting: false,
    hasPendingInvite: { 
        name: null,
        bookId: null
    }
};

export const communicationReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CLIENTS_RECEIVED:
            return Object.assign({}, state, { clients: clientDecorator(action.payload) });
        case types.INVITE:
            return Object.assign({}, state, { isInviting: true });
        case types.CANCEL_INVITE:
            return Object.assign({}, state, { isInviting: false });
        case types.INVITE_RECEIVED: 
            return Object.assign({}, state, { hasPendingInvite: action.payload });
        default:
            return state;
    }
};

function clientDecorator(clients = []) {
    return clients.map(client => {
        const IMAGE_COUNT = 5;
        const rndAvatarIdx = Math.floor(Math.random() * IMAGE_COUNT);

        client.avatar = `/assets/images/avatars/${ rndAvatarIdx }.jpg`;

        return client;
    });
}

export const communicationEpics = combineEpics(
    loginEpic,
    logoutEpic,
    connectEpic,
    inviteEpic,
    declineInvitationEpic,
    acceptInvitationEpic,
    interactEpic
);


