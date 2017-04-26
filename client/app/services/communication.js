import SimpleWebRTC from 'simplewebrtc';

function Communication() {
    let webrtc;

    const connect= ({ localVideoEl, remoteVideosEl}) => {
        webrtc = new SimpleWebRTC({
            localVideo,
            remoteVideosEl
        });

        return new Promise(resolve => {
            webrtc.on('readyToCall', () => resolve());
        });
    };


    const joinRoom = name => {
        return new Promise((resolve, reject) => {
            webrtc.joinRoom(name, (err, roomDescription) => {
                if (err) {
                    reject(err);
                }
                resolve(roomDescription);
            });
        });
    };

    return {
        connect,
        joinRoom
    }
}

export default Communication();
