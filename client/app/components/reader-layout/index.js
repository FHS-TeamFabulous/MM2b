import React from 'react';
import style from './style.scss';
import CustomButton from './../button';
import {Grid} from 'react-bootstrap';
import BookReader from 'app/components/book-reader';
import VideoCircle from 'app/components/video-circle';
import { connect } from 'react-redux';

import FaClose from 'react-icons/lib/fa/close';
import Communication from 'app/services/communication';

const closeIcon = <FaClose className={style.icon}/>;

import { Link } from 'react-router-dom';

class ReaderLayout extends React.Component {

    componentDidMount() {
        this.communication = Communication.connect({
            localVideoEl: 'localVideo',
            remoteVideosEl: 'remoteVideo'
        }).then(() => console.log('local Video success'))
    }

    render() {
        return (
            <div className={style.readerLayoutWrapper}>
                <Link to="/"><CustomButton type={"closeButton"} content={closeIcon}/></Link>
                <Grid>
                    <BookReader/>
                    <div>
                        <div className={style.videosWrapper}>
                            <div className={style.videoTagWrapperLeft} >
                                <VideoCircle type="localVideo"/>
                            </div>
                            <div className={style.videoTagWrapperRight}>
                                <VideoCircle type="remoteVideo" />
                            </div>
                        </div>
                    </div>
                </Grid>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        clients: state.signaling.clients
    }
};

export default connect(mapStateToProps)(ReaderLayout);
