import * as socketActions from 'app/actions/socket';

export const types = {
    INVITATION_SEND: 'INVITATION_SEND',
    INVITATION_RECEIVED: 'INVITATION_RECEIVED',
    INVITATION_CANCEL_SEND: 'INVITATION_CANCEL_SEND',
    INVITATION_CANCEL_RECEIVED: 'INVITATION_CANCEL_RECEIVED',
    INVITATION_ACCEPT_SEND: 'INVITATION_ACCEPT_SEND',
    INVITATION_ACCEPT_RECEIVED: 'INVITATION_ACCEPT_RECEIVED',
    INVITATION_DECLINE_SEND: 'INVITATION_DECLINE_SEND',
    INVITATION_DECLINE_RECEIVED: 'INVITATION_DECLINE_RECEIVED',
};

export function setInvitationSend(receiver, bookId) {
    return {
        type: types.INVITATION_SEND,
        receiver,
        bookId,
    };
}

export function sendInvitation(receiver, bookId) {
    return (dispatch) => {
        dispatch(socketActions.sendInvitation(receiver, bookId));
        dispatch(setInvitationSend(receiver, bookId));
    };
}

export function setInvitationCancelSend() {
    return {
        type: types.INVITATION_CANCEL_SEND,
    };
}

export function cancelInvitation(receiver) {
    return (dispatch) => {
        dispatch(socketActions.cancelInvitation(receiver));
        dispatch(setInvitationCancelSend());
    };
}

export function setInvitationReceived(sender, bookId, roomId) {
    return {
        type: types.INVITATION_RECEIVED,
        sender,
        bookId,
        roomId,
    };
}

export function receivedInvitation(sender, bookId, roomId) {
    return (dispatch) => {
        dispatch(setInvitationReceived(sender, bookId, roomId));
    };
}

export function setInvitationCancelReceived() {
    return {
        type: types.INVITATION_CANCEL_RECEIVED,
    };
}

export function canceledInvitation() {
    return (dispatch) => {
        dispatch(setInvitationCancelReceived());
    };
}

export function setInvitationAccept(receiver, bookId, roomId) {
    return {
        type: types.INVITATION_ACCEPT_SEND,
        receiver,
        bookId,
        roomId,
    };
}

export function acceptInvitation(receiver, bookId, roomId) {
    return (dispatch) => {
        dispatch(socketActions.acceptInvitation(receiver, bookId, roomId));
        dispatch(setInvitationAccept(receiver, bookId, roomId));
    };
}

export function setInvitationAccepted(sender, bookId, roomId) {
    return {
        type: types.INVITATION_ACCEPT_RECEIVED,
        sender,
        bookId,
        roomId,
    };
}

export function acceptedInvitation(sender, bookId, roomId) {
    return (dispatch) => {
        dispatch(setInvitationAccepted(sender, bookId, roomId));
    };
}

export function setInvitationDecline() {
    return {
        type: types.INVITATION_DECLINE_SEND,
    };
}

export function declineInvitation(receiver) {
    return (dispatch) => {
        dispatch(socketActions.declineInvitation(receiver));
        dispatch(setInvitationDecline());
    };
}

export function setInvitationDeclined() {
    return {
        type: types.INVITATION_DECLINE_RECEIVED,
    };
}

export function declinedInvitation() {
    return (dispatch) => {
        dispatch(setInvitationDeclined());
    };
}

