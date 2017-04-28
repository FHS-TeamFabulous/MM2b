import React from 'react';
import style from './style.scss';
import BookReader from 'app/components/book-reader';
import VideoCircle from 'app/components/video-circle';
import { connect } from 'react-redux';
import CustomButton from 'app/components/button';
import FaClose from 'react-icons/lib/fa/close';
import Communication from 'app/services/communication';
import * as actions from 'app/actions/communication-actions';
import { closeBook } from 'app/actions/books-actions';
import { Link } from 'react-router-dom';
import InteractionTools from 'app/components/interaction-tools';
import {openCloseModal, closeModal} from 'app/actions/modal-actions';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

class ReaderLayout extends React.Component {
    componentDidMount() {
        Communication.connect({
            localVid: 'local_container',
            remotesContainer: 'remote_container',
            remoteVidElement: VideoCircle
        });
    }

    componentWillUnmount() {
        Communication.leaveRoom();
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
                    <CustomButton onClick={this.openModal.bind(this)} className="closeButton">
                        <FaClose className={style.icon}/>
                    </CustomButton>
                    <BookReader bookId={this.props.match.params.id} />
                    <InteractionTools />
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

    closeModal() {
        this.props.dispatch(closeModal());
    }
    openModal() {
        this.props.dispatch(openCloseModal());
    }
}

function mapStateToProps(state) {

    return {
        show: state.modalState.show,
        modalType: state.modalState.modalType
    }
}

export default connect(mapStateToProps)(ReaderLayout);
