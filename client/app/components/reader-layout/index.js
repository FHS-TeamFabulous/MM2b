import React from 'react';
import style from './style.scss';
import CustomButton from './../button';
import {Grid} from 'react-bootstrap';
import BookReader from 'app/components/book-reader';
import VideoCircle from 'app/components/video-circle';
import { connect } from 'react-redux';

import FaClose from 'react-icons/lib/fa/close';
import Communication from 'app/services/communication';
import * as actions from 'app/actions/communication-actions';

const closeIcon = <FaClose className={style.icon}/>;

import { Link } from 'react-router-dom';

class ReaderLayout extends React.Component {

    componentDidMount() {
        const login = prompt('login');
        this.props.dispatch(actions.createLogin(login));

        this.communication = Communication.connect({
            localVid: 'local_container',
            remotesContainer: 'remote_container',
            remoteVidElement: VideoCircle
        });
    }

    connect() {
        const name = prompt('name');
        this.props.dispatch(actions.createConnection(name));
    }

    interact(event) {
        console.log('interaction event: ', event);
        this.props.dispatch(actions.createInteraction({ test: 'testdata'}))
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
                                <VideoCircle type="local"/>
                            </div>
                            <div className={style.videoTagWrapperRight}>
                                <VideoCircle type="remote"/>
                            </div>
                        </div>
                    </div>
                    <CustomButton clickHandler={this.connect.bind(this)} content="Connect"/>
                    <CustomButton clickHandler={this.interact.bind(this)} content="Interact"/>
                </Grid>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {}
};

export default connect(mapStateToProps)(ReaderLayout);
