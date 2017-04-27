import React from 'react';
import style from './style.scss';
import CustomButton from './../button';
import BookReader from 'app/components/book-reader';
import VideoCircle from 'app/components/video-circle';
import { connect } from 'react-redux';
import FaClose from 'react-icons/lib/fa/close';
import { closeBook } from 'app/actions/books-actions';
import { Link } from 'react-router-dom';
import CustomModal from 'app/components/custom-modal';
import {Modal} from 'react-bootstrap';
import {openCloseModal, closeModal} from 'app/actions/modal-actions';


class ReaderLayout extends React.Component {
    render() {
        return (
            <div className={style.readerLayoutWrapper}>
                <CustomModal/>
                <CustomButton onClick={this.openModal.bind(this)} className="closeButton">
                    <FaClose className={style.icon}/>
                </CustomButton>

                <div>
                    <BookReader bookId={this.props.match.params.id} />
                    <div>
                        <div className={style.videosWrapper}>
                            <div className={style.videoTagWrapperLeft}>
                                <VideoCircle />
                            </div>
                            <div className={style.videoTagWrapperRight}>
                                <VideoCircle />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    closeHandler() {
        this.props.dispatch(closeBook());
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
