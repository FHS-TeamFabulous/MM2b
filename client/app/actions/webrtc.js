import io from 'socket.io-client';
import messageTypes from 'shared/message-types';
import SimpleWebRTC from 'simplewebrtc';

let webrtc;

export function connect(localVideoId, remoteVideoId) {
    return (dispatch, getState) => {
        if (!webrtc) {
            webrtc = new SimpleWebRTC({
                localVideoEl: localVideoId,
                remoteVideosEl: remoteVideoId,
                autoRequestMedia: true
            });

            webrtc.on('connectionReady', function () {
                // you can name it anything
                webrtc.joinRoom(getState().reader.book.id);
            });
        } else {
            webrtc.joinRoom(getState().reader.book.id);
            webrtc.startLocalVideo();
        }
    };
}

export function disconnect() {
    return () => {
        webrtc.stopLocalVideo();
        webrtc.leaveRoom();
    }
}

