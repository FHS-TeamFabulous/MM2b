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
    INVITATION_ACCEPTED: '[communication] INVITATION ACCEPTED',
    INVITATION_DECLINED: '[communication] INVITATION DECLINED'
};

export function createClientsReceived(clients) {
    return {
        type: types.CLIENTS_RECEIVED,
        payload: clients
    };
}

export function createLogin(name) {
    return {
        type: types.LOGIN,
        payload: {
            name
        }
    };
}

export function createLoginSent(name) {
    return {
        type: types.LOGIN_SENT,
        payload: {
            name
        }
    };
}

export function createLoginSuccess(name) {
    return {
        type: types.LOGIN_SUCCESS,
        payload: {
            name
        }
    };
}

export function createLoginFailed(message) {
    return {
        type: types.LOGIN_FAILED,
        payload: {
            message
        }
    };
}

export function createLogout(name) {
    return {
        type: types.LOGOUT,
        payload: {
            name
        }
    };
}

export function createLogoutSent(name) {
    return {
        type: types.LOGOUT_SENT,
        payload: {
            name
        }
    };
}

export function createLogoutSuccess(name) {
    return {
        type: types.LOGOUT_SUCCESS,
        payload: {
            name
        }
    };
}

export function createConnected(roomDescription) {
    return {
        type: types.CONNECTED,
        payload: {
            roomDescription
        }
    };
}

export function createConnection(name) {
    return {
        type: types.CONNECT,
        payload: {
            name
        }
    };
}

export function createInvite(name) {
    return {
        type: types.INVITE,
        payload: {
            name
        }
    };
}

export function createInviteSent(name) {
    return {
        type: types.INVITE_SENT,
        payload: {
            name
        }
    };
}

export function createInviteReceived(from, to) {
    return {
        type: types.INVITE_RECEIVED,
        payload: {
            from,
            to
        }
    };
}

export function createInvitationAccepted(name) {
    return {
        type: types.INVITATION_ACCEPTED,
        payload: {
            name
        }
    };
}

export function createInvitationDeclined(name) {
    return {
        type: types.INVITATION_DECLINED,
        payload: {
            name
        }
    };
}

export function createInteraction(data) {
    return {
        type: types.INTERACTION,
        payload: data
    };
}

export function createInteractionSent(data) {
    return {
        type: types.INTERACTION_SENT,
        payload: data
    };
}

export function createInteractionReceived(data) {
    return {
        type: types.INTERACTION_RECEIVED,
        payload: data
    };
}
