import React from 'react';
import style from './style.scss';

export default class VideoCircle extends React.Component {
    render() {
        return (
            <div className={style.video}>
                <video autoPlay src="https://easportsassets-a.akamaihd.net/pulse.content.easports.com/web/OnlineAssets/easports/2017/easports17-video-reel.mp4"/>
            </div>
        );
    }
}
