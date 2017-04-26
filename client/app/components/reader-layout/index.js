import React from 'react';
import style from './style.scss';
import CustomButton from './../button';
import {Grid} from 'react-bootstrap';
import BookReader from 'app/components/book-reader';
import VideoCircle from 'app/components/video-circle';

import FaClose from 'react-icons/lib/fa/close';

const closeIcon = <FaClose className={style.icon}/>;

import { Link } from 'react-router-dom';

export default class ReaderLayout extends React.Component {
    render() {
        return (
            <div className={style.readerLayoutWrapper}>
                <Link to="/"><CustomButton type={"closeButton"} content={closeIcon}/></Link>
                <Grid>
                    <BookReader/>
                    <div>
                        <div className={style.videosWrapper}>
                            <div className={style.videoTagWrapperLeft} >
                                <VideoCircle />
                            </div>
                            <div className={style.videoTagWrapperRight}>
                                <VideoCircle />
                            </div>
                        </div>
                    </div>
                </Grid>
            </div>
        );
    }
}
