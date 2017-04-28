import SimpleWebRTC from 'simplewebrtc';
import io from 'socket.io-client';
import config from 'config';
import * as actions from 'app/actions/communication-actions';
import {logIn} from 'app/actions/auth-actions';
import React from 'react';

function SocketIoConnection(socket) {
    this.connection = socket;
}

SocketIoConnection.prototype.on = function (ev, fn) {
    this.connection.on(ev, fn);
};

SocketIoConnection.prototype.emit = function () {
    this.connection.emit.apply(this.connection, arguments);
};

SocketIoConnection.prototype.getSessionid = function () {
    return this.connection.id;
};

SocketIoConnection.prototype.disconnect = function () {
    return this.connection.disconnect();
};

function Communication() {
    let webrtc;
    const server = config.server.base || 'http://localhost:3000';
    const socket = io(server);
    let sessionId;

    const connect = ({localVid, remotesContainer}) => {
        webrtc = new SimpleWebRTC({
            localVideoEl: localVid,
            remoteVideosEl: remotesContainer,
            autoRequestMedia: true,
            connection: new SocketIoConnection(socket)
        });

        return new Promise(resolve => {
            webrtc.on('connectionReady', function (id) {
                sessionId = id;

                resolve(sessionId);
            });
        });
    };

    const disconnect = () => {
        webrtc.disconnect();
    };

    const joinRoom = (name, bookId) => {
        return new Promise((resolve, reject) => {
            webrtc.joinRoom({name, bookId}, (err, roomDescription) => {
                if (err) {
                    reject(err);
                }
                webrtc.roomName = roomDescription;
                resolve(roomDescription);
            });
        });
    };

    const leaveRoom = () => {
        webrtc.leaveRoom();
        webrtc.webrtc.stopLocalMedia();
    };

    const login = name => {
        socket.emit('login', {name});
    };

    const logout = name => {
        socket.emit('logout', {name});
    };

    const loadClients = (loggedIn = true) => {
        socket.emit('clients', {loggedIn});
    };

    const invite = (name, bookId) => {
        socket.emit('invite', ({name, bookId}));
    };

    const cancelInvite = (name, bookId) => {
        socket.emit('invite_cancel', {name, bookId});
    };

    const acceptInvite = (name, bookId) => {
        socket.emit('invitation_accept', ({name, bookId}))
    };

    const declineInvite = (name, bookId) => {
        socket.emit('invitation_declined', ({name, bookId}))
    };

    const interact = data => {
        socket.emit('interaction', data);
    };

    const addEventListeners = (dispatch, getState) => {
        socket.on('login_success', ({name}) => {
            dispatch(logIn(name));
        });

        socket.on('logout_success', ({name}) => {
            dispatch(actions.createLogoutSuccess(name));
        });

        socket.on('login_failed', ({message}) => {
            dispatch(actions.createLoginFailed(message));
        });

        socket.on('clients_success', ({clients}) => {
            console.log(clients);
            dispatch(actions.createClientsReceived(clients));
        });

        socket.on('invitation_received', ({from, bookId}) => {
            console.log(`${from} sent invitation to read book with id ${bookId}`);
            dispatch(actions.createInviteReceived(from, bookId));
        });

        socket.on('invite_accepted', ({name, bookId}) => {
            dispatch(actions.createInvitationAccepted(name, bookId));
        });

        socket.on('invite_declined', ({name, bookId}) => {
            dispatch(actions.createInvitationDeclined(name, bookId));
        });

        socket.on('interaction_received', data => {
            console.log('interaction received: ', data);
            dispatch(actions.createInteractionReceived(data));
        });
    };

    return {
        connect,
        disconnect,
        joinRoom,
        leaveRoom,
        login,
        logout,
        loadClients,
        invite,
        cancelInvite,
        acceptInvite,
        declineInvite,
        interact,
        addEventListeners
    }
}

export default Communication();
