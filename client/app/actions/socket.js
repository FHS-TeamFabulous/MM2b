import io from 'socket.io-client';
import messageTypes from 'shared/message-types';
import * as authActions from 'app/actions/auth';
import * as readerActions from 'app/actions/reader';
import * as webRTCActions from 'app/actions/webrtc';
import * as invitationActions from 'app/actions/invitation';

let socket;

export function connect() {
    return (dispatch, getState) => {
        const state = getState();

        socket = io();

        socket.on(messageTypes.LOGIN_SUCCESS, (authData) => 
            dispatch(authActions.setAuthData(authData.user, authData.clients)));

        socket.on(messageTypes.CLIENTS_UPDATE, (clientsData) => 
            dispatch(authActions.updateClients(clientsData.clients.filter((client) => client.id !== state.auth.user.id))));

        socket.on(messageTypes.INVITATION_RECEIVED, (senderData) => 
            dispatch(invitationActions.receivedInvitation(senderData.sender, senderData.bookId)));

        socket.on(messageTypes.INVITATION_CANCELED, (senderData) => 
            dispatch(invitationActions.canceledInvitation(senderData.sender)));

        socket.on(messageTypes.INVITATION_ACCEPTED, (senderData) => {
            dispatch(invitationActions.acceptedInvitation(senderData.sender, senderData.bookId));
            dispatch(readerActions.openReader(senderData.bookId));
        });

        socket.on(messageTypes.INVITATION_DECLINED, (senderData) => 
            dispatch(invitationActions.declinedInvitation(senderData.sender)));

        socket.on(messageTypes.READER_LEFT, (leavingData) => {
            dispatch(readerActions.unsetBook());
            dispatch(webRTCActions.disconnect());
            dispatch(readerActions.leftReaderReceived(leavingData.sender));
        });
    };
}

export function login(userName) {
    return () => {
        socket.emit(messageTypes.LOGIN, { userName });
    }
}

export function sendInvitation(receiver, bookId) {
    return () => {
        socket.emit(messageTypes.INVITATION_SEND, { 
            receiverId: receiver.id,
            bookId
        });
    }
}

export function cancelInvitation(receiver) {
    return () => {
        socket.emit(messageTypes.INVITATION_CANCEL, { receiverId: receiver.id });
    }
}

export function acceptInvitation(receiver, bookId) {
    return () => {
        socket.emit(messageTypes.INVITATION_ACCEPT, { receiverId: receiver.id, bookId });
    }
}

export function declineInvitation(receiver) {
    return () => {
        socket.emit(messageTypes.INVITATION_DECLINE, { receiverId: receiver.id });
    }
}

export function leaveReader(receiver) {
    return () => {
        socket.emit(messageTypes.READER_LEAVE, { receiverId: receiver.id });
    }
}
