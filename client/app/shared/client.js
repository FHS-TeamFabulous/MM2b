import io from 'socket.io-client';
import { Observable, Subject } from 'rxjs';

export const connectionTypes = {
    LOGIN: 'login',
    LOGOUT: 'logout',
    OFFER: 'offer',
    ANSWER: 'answer',
    CANDIDATE: 'candidate',
};

/*
function Communication() {
    'use strict';

    const localVid = document.getElementById('localVideo');
    const remoteVid = document.getElementById('remoteVideo');

    localVideo.addEventListener('loadedmetadata', function () {
        console.log('Local video videoWidth: ' + this.videoWidth +
            'px,  videoHeight: ' + this.videoHeight + 'px');
    });

    remoteVideo.addEventListener('loadedmetadata', function () {
        console.log('Remote video videoWidth: ' + this.videoWidth +
            'px,  videoHeight: ' + this.videoHeight + 'px');
    });
}
*/

export default function Client(config = {}) {
    const {
        name
    } = config;

    const _signals$ = createMessageStream();
    const peerConnection = new RTCPeerConnection();
    const getUserMedia = navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    const login = () => {
        send({
            type: connectionTypes.LOGIN,
            name
        })
    };

    const logout = () => {
        send({
            type: connectionTypes.LOGOUT,
            name
        });
    };


    const offer = () => {
        return peerConnection.createOffer()
            .then(offer => {
                peerConnection.setLocalDescriptor(offer);
                send({
                    type: connectionTypes.OFFER,
                    name,
                    offer
                });
            });

    };

    const answer = message => {
        const { name, offer } = message;
        peerConnection.setRemoteDescription(offer);
        peerConnection.createAnswer()
            .then(answer => {
                peerConnection.setLocalDescription(answer);
                send({
                    type: connectionTypes.ANSWER,
                    name,
                    answer
                });
            });
    };

    const send = message => {
        _signals$.next(message);
    };

    function createMessageStream () {
        const socket = io.connect(server);

        const observable = Observable.create(observer => {
            socket.on('message', message => observer.next(message));
            socket.on('error', error => observer.error(error));
            return () => {
                socket.disconnect();
            }
        });

        return Subject.create({ next: message => socket.emit('message', message)}, observable);
    }

    return {
        getUserMedia,
        send,
        signals$: _signals$.asObservable(),
        offer,
        answer
    }
}
