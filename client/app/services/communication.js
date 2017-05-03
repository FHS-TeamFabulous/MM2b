import SimpleWebRTC from 'simplewebrtc';
import io from 'socket.io-client';
import config from 'config';
import * as actions from 'app/actions/communication-actions';
import {logIn} from 'app/actions/auth-actions';
import React from 'react';
import SocketIoConnection from './socketIoConnection';

const serverEvents = {
    LOGIN: 'login',
    LOGOUT: 'logout',
    CLIENTS: 'clients',
    INVITE: 'invite',
    INVITATION_ACCEPT: 'invitationAccept',
    INVITATION_DECLINE: 'invitationDecline',
    MESSAGE: 'message',
    SHARE_SCREEN: 'shareScreen',
    UNSHARE_SCREEN: 'unshareScreen',
    JOIN: 'join',
    INTERACT: 'interact',
    CONNECTION: 'connection',
    DISCONNECT: 'disconnect',
    LEAVE: 'leave',
    TRACE: 'trace',
    STUNSERVERS: 'stunservers',
    TURNSERVERS: 'turnservers'
};

const clientEvents = {
    LOGIN_SUCCESS: 'loginSuccess',
    LOGIN_FAILED: 'loginFailed',
    LOGOUT_SUCCESS: 'logoutSuccess',
    CLIENTS_RECEIVED: 'clientsReceived',
    INVITATION_RECEIVED: 'invitationReceived',
    INVITATION_ACCEPTED: 'invitationAccepted',
    INVITATION_DECLINED: 'invitationDeclined',
    MESSAGE: 'message',
    INTERACTION_RECEIVED: 'interactionReceived',

};


function Communication(conf) {


    let webrtc = null;
    const server = config.server.base || '/';
    const socket = io(server);

    const connected = () => webrtc !== null;

    const connect = ({localVid, remotesContainer}) => {
        webrtc = new SimpleWebRTC({
            localVideoEl: localVid,
            remoteVideosEl: remotesContainer,
            autoRequestMedia: true,
            connection: new SocketIoConnection(socket)
        });

        return new Promise(resolve => {
            webrtc.on('connectionReady', function (sessionId) {
                resolve(sessionId);
            });
        });
    };

    const disconnect = () => {
        webrtc.disconnect();
        return Promise.resolve();
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
        return Promise.resolve();
    };

    const login = name => {
        socket.emit('login', {name});
        return Promise.resolve(name);
    };

    const logout = name => {
        socket.emit('logout', {name});
        return Promise.resolve(name);
    };

    const loadClients = (loggedIn = true) => {
        socket.emit('clients', {loggedIn});
        return Promise.resolve(loggedIn);
    };

    const invite = (name, bookId) => {
        socket.emit('invite', ({name, bookId}));
        return Promise.resolve({name, bookId});
    };

    const cancelInvite = (name, bookId) => {
        socket.emit('invite_cancel', {name, bookId});
        return Promise.resolve({name, bookId});
    };

    const acceptInvite = (name, bookId) => {
        socket.emit('invitation_accept', ({name, bookId}));
        return Promise.resolve({name, bookId});
    };

    const declineInvite = (name, bookId) => {
        socket.emit('invitation_declined', ({name, bookId}));
        return Promise.resolve({name, bookId});
    };

    const interact = data => {
        socket.emit('interaction', data);
        return Promise.resolve(data);
    };

    const addEventListeners = (dispatch, getState) => {
        socket.on('login_success', ({name}) => {
            dispatch(logIn(name));
        });

        socket.on('logout_success', ({name}) => {
            dispatch(actions.logoutSuccess(name));
        });

        socket.on('login_failed', ({message}) => {
            dispatch(actions.loginFailed(message));
        });

        socket.on('clients_success', ({clients}) => {
            console.log(clients);
            dispatch(actions.clientsReceived(clients));
        });

        socket.on('invitation_received', ({name, bookId}) => {
            console.log(`${name} sent invitation to read book with id ${bookId}`);
            dispatch(actions.inviteReceived(name, bookId));
        });

        socket.on('invite_accepted', ({name, bookId}) => {
            dispatch(actions.invitationAccepted(name, bookId));
        });

        socket.on('invite_declined', ({name, bookId}) => {
            dispatch(actions.invitationDeclined(name, bookId));
        });

        socket.on('interaction_received', data => {
            console.log('interaction received: ', data);
            dispatch(actions.interactionReceived(data));
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

export default Communication(config);
