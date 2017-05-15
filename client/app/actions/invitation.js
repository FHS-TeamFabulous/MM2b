import * as socketActions from 'app/actions/socket';

export const types = {
    INVITATION_SEND: 'INVITATION_SEND',
    INVITATION_RECEIVED: 'INVITATION_RECEIVED',
    INVITATION_CANCEL_SEND: 'INVITATION_CANCEL_SEND',
    INVITATION_CANCEL_RECEIVED: 'INVITATION_CANCEL_RECEIVED', 
    INVITATION_ACCEPT_SEND: 'INVITATION_ACCEPT_SEND',
    INVITATION_ACCEPT_RECEIVED: 'INVITATION_ACCEPT_RECEIVED',
    INVITATION_DECLINE_SEND: 'INVITATION_DECLINE_SEND',
    INVITATION_DECLINE_RECEIVED: 'INVITATION_DECLINE_RECEIVED'
};

export function sendInvitation(receiver, bookId) {
    return (dispatch) => {
        dispatch(socketActions.sendInvitation(receiver, bookId));
        dispatch(setInvitationSend(receiver, bookId));
    }
}

export function setInvitationSend(receiver, bookId) {
    return {
        type: types.INVITATION_SEND,
        receiver,
        bookId
    };
}

export function cancelInvitation(receiver) {
    return (dispatch) => {
        dispatch(socketActions.cancelInvitation(receiver));
        dispatch(setInvitationCancelSend());
    }
}

export function setInvitationCancelSend() {
    return {
        type: types.INVITATION_CANCEL_SEND
    };
}

export function receivedInvitation(sender, bookId) {
    return (dispatch) => {
        dispatch(setInvitationReceived(sender, bookId));
    };
}

export function setInvitationReceived(sender, bookId) {
    return {
        type: types.INVITATION_RECEIVED,
        sender,
        bookId
    };
}

export function canceledInvitation(sender) {
    return (dispatch) => {
        dispatch(setInvitationCancelReceived());
    };
}

export function setInvitationCancelReceived() {
    return {
        type: types.INVITATION_CANCEL_RECEIVED
    };
}

export function acceptInvitation(receiver, bookId) {
    return (dispatch) => {
        dispatch(socketActions.acceptInvitation(receiver, bookId));
        dispatch(setInvitationAccept(receiver, bookId));
    }
}

export function setInvitationAccept(receiver, bookId) {
    return {
        type: types.INVITATION_ACCEPT_SEND,
        receiver,
        bookId
    };
}

export function acceptedInvitation(sender, bookId) {
    return (dispatch) => {
        dispatch(setInvitationAccepted(sender, bookId));
    }
}

export function setInvitationAccepted(sender, bookId) {
    return {
        type: types.INVITATION_ACCEPT_RECEIVED,
        sender,
        bookId
    }
}

export function declineInvitation(receiver) {
    return (dispatch) => {
        dispatch(socketActions.declineInvitation(receiver));
        dispatch(setInvitationDecline());
    }
}

export function setInvitationDecline() {
    return {
        type: types.INVITATION_DECLINE_SEND
    };
}

export function declinedInvitation() {
    return (dispatch) => {
        dispatch(setInvitationDeclined());
    }
}

export function setInvitationDeclined() {
    return {
        type: types.INVITATION_DECLINE_RECEIVED
    }
}
