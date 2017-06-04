import SimpleWebRTC from 'simplewebrtc';

let webrtc;

export function connect(localVideoId, remoteVideoId) {
    return (dispatch, getState) => {
        const state = getState();

        if (!webrtc) {
            webrtc = new SimpleWebRTC({
                localVideoEl: localVideoId,
                remoteVideosEl: remoteVideoId,
                autoRequestMedia: true
            });

            webrtc.on('readyToCall', () => {
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
    };
}
