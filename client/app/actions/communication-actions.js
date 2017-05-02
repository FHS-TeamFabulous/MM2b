import Communication from 'app/services/communication';

export const types = {
    LOGIN: '[communication] LOGIN',
    LOGIN_SENT: '[communication] LOGIN SENT',
    LOGIN_SUCCESS: '[communication] LOGIN SUCCESS',
    LOGIN_FAILED: '[communication] LOGIN FAILED',
    LOGOUT: '[communication] LOGOUT',
    LOGOUT_SENT: '[communication] LOGOUT SENT',
    LOGOUT_SUCCESS: '[communication] LOGOUT SUCCESS',
    CLIENTS_RECEIVED: '[communication] CLIENTS RECEIVED',
    CONNECT: '[communication] CONNECT',
    CONNECTED: '[communication] CONNECTED',
    INTERACTION: '[communication] INTERACTION',
    INTERACTION_SENT: '[communcation] INTERACTION SENT',
    INTERACTION_RECEIVED: '[communication] INTERACTION RECEIVED',
    INVITE: '[communication] INVITE',
    INVITE_SENT: '[communication] INVITE SENT',
    INVITE_RECEIVED: '[communication] INVITE RECEIVED',
    INVITE_CANCEL: '[communication] INVITE CANCEL',
    ACCEPT_INVITATION: '[communication] ACCEPT INVITATION',
    INVITATION_ACCEPTED: '[communication] INVITATION ACCEPTED',
    INVITATION_ACCEPTED_SENT: '[communication] INVITATION ACCEPTED SENT',
    INVITATION_DECLINED: '[communication] INVITATION DECLINED',
    INVITATION_DECLINED_SENT: '[communcation] INVITATION DECLINED SENT',
};

export function clientsReceived(clients) {
    return {
        type: types.CLIENTS_RECEIVED,
        payload: clients
    };
}

export function login(name) {
    return {
        type: types.LOGIN,
        payload: {
            name
        }
    };
}

export function loginSent(name) {
    return {
        type: types.LOGIN_SENT,
        payload: {
            name
        }
    };
}

export function loginSuccess(name) {
    return {
        type: types.LOGIN_SUCCESS,
        payload: {
            name
        }
    };
}

export function loginFailed(message) {
    return {
        type: types.LOGIN_FAILED,
        payload: {
            message
        }
    };
}

export function logout(name) {
    return {
        type: types.LOGOUT,
        payload: {
            name
        }
    };
}

export function logoutSent(name) {
    return {
        type: types.LOGOUT_SENT,
        payload: {
            name
        }
    };
}

export function logoutSuccess(name) {
    return {
        type: types.LOGOUT_SUCCESS,
        payload: {
            name
        }
    };
}

export function connected(roomDescription) {
    return {
        type: types.CONNECTED,
        payload: {
            roomDescription
        }
    };
}

export function connection(name) {
    return {
        type: types.CONNECT,
        payload: {
            name
        }
    };
}

export function invite(name, bookId) {
    return {
        type: types.INVITE,
        payload: {
            name,
            bookId
        }
    };
}

export function cancelInvite(name) {
    return {
        type: types.INVITE_CANCEL,
        payload: {
            name
        }
    };
}

export function inviteSent(name) {
    return {
        type: types.INVITE_SENT,
        payload: {
            name
        }
    };
}

export function inviteReceived(name, bookId) {
    return {
        type: types.INVITE_RECEIVED,
        payload: {
            name,
            bookId
        }
    };
}

export function invitationAccepted(name, bookId) {
    return {
        type: types.INVITATION_ACCEPTED,
        payload: {
            name,
            bookId
        }
    };
}

export function acceptInvitation(name, bookId) {
    return {
        type: types.ACCEPT_INVITATION,
        payload: {
            name,
            bookId
        }
    };
}

export function invitationDeclined(name, bookId) {
    return {
        type: types.INVITATION_DECLINED,
        payload: {
            name,
            bookId
        }
    };
}

export function invitationDeclinedSent() {
    return {
        type: types.INVITATION_DECLINED_SENT
    };
}

export function interaction(data) {
    return {
        type: types.INTERACTION,
        payload: data
    };
}

export function interactionSent(data) {
    return {
        type: types.INTERACTION_SENT,
        payload: data
    };
}

export function interactionReceived(data) {
    return {
        type: types.INTERACTION_RECEIVED,
        payload: data
    };
}
