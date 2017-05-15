import io from 'socket.io-client';
import messageTypes from 'shared/message-types';
import SimpleWebRTC from 'simplewebrtc';

let webrtc;

export function connect(localVideoId, remoteVideoId) {
    return (dispatch, getState) => {
        const state = getState();

        if (!webrtc) {
            webrtc = new SimpleWebRTC({
                localVideoEl: localVideoId,
                remoteVideosEl: remoteVideoId
            });

            webrtc.on('readyToCall', function () {
                webrtc.joinRoom(state.invitation.accepted.roomId);
            });
        }

        webrtc.startLocalVideo();
    };
}

export function disconnect() {
    return () => {
        webrtc.stopLocalVideo();
        webrtc.leaveRoom();
    }
}

