import SimpleWebRTC from 'simplewebrtc';
import io from 'socket.io-client';
import config from 'config';
import * as actions from 'app/actions/communication-actions';
import { logIn } from 'app/actions/auth-actions';
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

    const connect = ({ localVid, remotesContainer }) => {
        webrtc = new SimpleWebRTC({
            localVideoEl: localVid,
            remoteVideosEl: remotesContainer,
            autoRequestMedia: true,
            connection: new SocketIoConnection(socket)
        });

        return new Promise(resolve => {
            webrtc.on('connectionReady', function (id) {
                sessionId = id;
                // config callbacks
                /*console.log('connection ready');*/

                webrtc.on('createdPeer', peer => {
                    /*console.log('createdPeer: ', peer);*/
                });

                webrtc.on('videoAdded', function (video, peer) {
                    /*console.log('videoAdded');
                    console.log('video: ', video);
                    console.log('peer: ', peer);*/
                }.bind(this));

                webrtc.on('readyToCall', () => {
                    /*console.log('readyToCall');*/
                });

                webrtc.on('joinedRoom', roomDesctiption => {
                    /*console.log('webrtc event: joinedRoom', roomDesctiption);*/
                });

                resolve(sessionId);
            });
        });
    };

    const disconnect = () => {
        webrtc.disconnect();
    };

    const joinRoom = name => {
        return new Promise((resolve, reject) => {
            webrtc.joinRoom(name, (err, roomDescription) => {
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
        socket.emit('login', { name });
    };

    const logout = name => {
        socket.emit('logout', { name });
    };

    const loadClients = (loggedIn = true) => {
        socket.emit('clients', { loggedIn });
    };

    const invite = name => {
        socket.emit('invite', ({name}));
    };

    const acceptInvite = name => {
        socket.emit('invitation_accept', ({name}))
    };

    const declineInvite = name => {
        socket.emit('invitation_declined', ({name}))
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
            dispatch(actions.createClientsReceived(clients));
        });

        socket.on('invitation_received', ({ from, room }) => {
            console.log(`${from} sent invitation to ${room}`);
            dispatch(actions.createInviteReceived(from, room));

            const accept = confirm(`Accept invitatoin from ${from}`);

            if (accept) {
                dispatch(actions.createInvitationAccepted(from));
            } else {
                dispatch(actions.createInvitationDeclined(from));
            }

        });

        socket.on('invite_accepted', ({name}) => {
            dispatch(actions.createInvitationAccepted(name));
        });

        socket.on('invite_declined', ({name}) => {
            dispatch(actions.createInvitationDeclined(name));
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
        interact,
        addEventListeners
    }
}

export default Communication();
