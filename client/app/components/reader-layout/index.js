import React from 'react';
import style from './style.scss';
import CustomButton from './../button';
import BookReader from 'app/components/book-reader';
import VideoCircle from 'app/components/video-circle';
import { connect } from 'react-redux';

import FaClose from 'react-icons/lib/fa/close';
import Communication from 'app/services/communication';
import * as actions from 'app/actions/communication-actions';

const closeIcon = <FaClose className={style.icon}/>;

import { closeBook } from 'app/actions/books-actions';
import { Link } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

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
            <ReactCSSTransitionGroup
                transitionName={{
                    appear: style.fadeAppear,
                    appearActive: style.fadeAppearActive
                }}
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnter={false}
                transitionLeave={false}
            >
                <div className={style.readerLayoutWrapper}>
                    <Link to="/">
                        <CustomButton onClick={this.closeHandler.bind(this)} className="closeButton">
                            <FaClose className={style.icon}/>
                        </CustomButton>
                    </Link>
                    <BookReader bookId={this.props.match.params.id} />
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
                </div>
            </ReactCSSTransitionGroup>
        );
    }

    closeHandler() {
        this.props.dispatch(closeBook());
    }
}

export default connect()(ReaderLayout);
