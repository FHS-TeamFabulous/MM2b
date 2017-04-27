import React from 'react';
import style from './style.scss';
import CustomButton from './../button';
import BookReader from 'app/components/book-reader';
import VideoCircle from 'app/components/video-circle';
import { connect } from 'react-redux';
import FaClose from 'react-icons/lib/fa/close';
import { closeBook } from 'app/actions/books-actions';
import { Link } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

class ReaderLayout extends React.Component {
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
            </ReactCSSTransitionGroup>
        );
    }

    closeHandler() {
        this.props.dispatch(closeBook());
    }
}

export default connect()(ReaderLayout);
