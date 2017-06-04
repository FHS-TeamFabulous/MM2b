import io from 'socket.io-client';
import messageTypes from 'shared/message-types';
import * as authActions from 'app/actions/auth';
import * as readerActions from 'app/actions/reader';
import * as webRTCActions from 'app/actions/webrtc';
import * as invitationActions from 'app/actions/invitation';
import * as pointerActions from 'app/actions/pointer';

let socket;

export function connect() {
    return (dispatch, getState) => {
        socket = io();

        socket.on(messageTypes.LOGIN_SUCCESS, authData =>
            dispatch(authActions.setAuthData(authData.user, authData.clients)));

        socket.on(messageTypes.CLIENTS_UPDATE, (clientsData) => {
            const state = getState();

            dispatch(authActions
                .updateClients(
                    clientsData
                        .clients
                        .filter(client => client.id !== state.auth.user.id)
                )
            );
        });

        socket.on(messageTypes.INVITATION_RECEIVED, senderData =>
            dispatch(
                invitationActions
                    .receivedInvitation(
                        senderData.sender,
                        senderData.bookId,
                        senderData.roomId
                    )
            )
        );

        socket.on(messageTypes.INVITATION_CANCELED, senderData =>
            dispatch(invitationActions.canceledInvitation(senderData.sender)));

        socket.on(messageTypes.INVITATION_ACCEPTED, (senderData) => {
            dispatch(
                invitationActions
                    .acceptedInvitation(
                        senderData.sender,
                        senderData.bookId,
                        senderData.roomId
                    )
            );
            dispatch(readerActions.openReader(senderData.bookId));
        });

        socket.on(messageTypes.INVITATION_DECLINED, senderData =>
            dispatch(invitationActions.declinedInvitation(senderData.sender)));

        socket.on(messageTypes.READER_PAGED, senderData =>
            dispatch(readerActions.receivedReaderPaged(senderData.sender, senderData.page)));

        socket.on(messageTypes.READER_LEFT, (leavingData) => {
            dispatch(readerActions.unsetBook());
            dispatch(webRTCActions.disconnect());
            dispatch(pointerActions.stopPointer());
            dispatch(readerActions.leftReaderReceived(leavingData.sender));
        });

        socket.on(messageTypes.POINTER_ENABLED, senderData =>
            dispatch(
                pointerActions
                    .receivedPointerEnabled(
                        senderData.sender,
                        senderData.position
                    )
            )
        );

        socket.on(messageTypes.POINTER_DISABLED, senderData =>
            dispatch(pointerActions.receivedPointerDisabled(senderData.sender)));

        socket.on(messageTypes.POINTER_MOVED, senderData =>
            dispatch(pointerActions.receivedPointerMoved(senderData.sender, senderData.position)));
    };
}

export function login(userName) {
    return () => {
        socket.emit(messageTypes.LOGIN, { userName });
    };
}

export function sendInvitation(receiver, bookId) {
    return () => {
        socket.emit(messageTypes.INVITATION_SEND, {
            receiverId: receiver.id,
            bookId,
        });
    };
}

export function cancelInvitation(receiver) {
    return () => {
        socket.emit(messageTypes.INVITATION_CANCEL, { receiverId: receiver.id });
    };
}

export function acceptInvitation(receiver, bookId, roomId) {
    return () => {
        socket.emit(messageTypes.INVITATION_ACCEPT, {
            receiverId: receiver.id,
            bookId,
            roomId,
        });
    };
}

export function declineInvitation(receiver) {
    return () => {
        socket.emit(messageTypes.INVITATION_DECLINE, { receiverId: receiver.id });
    };
}

export function sendPageReader(receiver, page) {
    return () => {
        socket.emit(messageTypes.READER_PAGE, {
            receiverId: receiver.id,
            page,
        });
    };
}

export function leaveReader(receiver) {
    return () => {
        socket.emit(messageTypes.READER_LEAVE, { receiverId: receiver.id });
    };
}

export function sendPointerEnable(receiver, x, y) {
    return () => {
        socket.emit(messageTypes.POINTER_ENABLE, {
            receiverId: receiver.id,
            position: { x, y },
        });
    };
}

export function sendPointerDisable(receiver) {
    return () => {
        socket.emit(messageTypes.POINTER_DISABLE, { receiverId: receiver.id });
    };
}

export function sendPointerPosition(receiver, x, y) {
    return () => {
        socket.emit(messageTypes.POINTER_MOVE, {
            receiverId: receiver.id,
            position: { x, y },
        });
    };
}
