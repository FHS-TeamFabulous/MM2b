import React from 'react';
import style from './style.scss';
import CustomButton from './../button';
import {Grid} from 'react-bootstrap';

import FaClose from 'react-icons/lib/fa/close';

const closeIcon = <FaClose className={style.icon}/>;

import { Link } from 'react-router-dom';

export default class ReaderLayout extends React.Component {
    render() {
        return (
            <div className={style.readerLayoutWrapper}>
                <Link to="/"><CustomButton type={"closeButton"} content={closeIcon}/></Link>
                <Grid>
                    <div>
                        <div className={style.videosWrapper}>
                            <div className={style.videoTagWrapperLeft}>
                                <video className={style.videoTagLeft} loop="" autoPlay src="https://easportsassets-a.akamaihd.net/pulse.content.easports.com/web/OnlineAssets/easports/2017/easports17-video-reel.mp4"/>
                            </div>
                            <div className={style.videoTagWrapperRight}>
                                <video className={style.videoTagRight} loop="" autoPlay src="https://easportsassets-a.akamaihd.net/pulse.content.easports.com/web/OnlineAssets/easports/2017/easports17-video-reel.mp4"/>
                            </div>
                        </div>
                    </div>
                </Grid>
            </div>
        );
    }
}
