import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import FlipBook from 'app/components/flipbook';
import style from './style.scss';
import { Button } from 'react-bootstrap';
import FaClose from 'react-icons/lib/fa/close';
import Pointer from 'app/components/pointer';
import * as readerActions from 'app/actions/reader';
import * as pointerActions from 'app/actions/pointer';
import * as webRTCActions from 'app/actions/webrtc';

class Reader extends React.Component {
    componentDidMount() {
        document.body.classList.add('no-scroll');

        if (this.props.invitation.accepted) {
            this.props.dispatch(webRTCActions.connect('local-video', 'remote-video'));
        }
    }

    componentWillUnmount() {
        document.body.classList.remove('no-scroll');

        if (this.props.reader.book) {
            if (this.props.invitation.accepted) {
                this.props.dispatch(pointerActions.stopPointer());
            }
            
            this.props.dispatch(readerActions.closeReader());
        }
    }

    onChangePage(page) {
        if (!this.props.invitation.accepted) return;

        this.props.dispatch(readerActions.sendPageReader(
            this.props.invitation.accepted.opponent,
            page
        ));
    }

    closeReader() {
        if (this.props.invitation.accepted) {
            this.props.dispatch(pointerActions.stopPointer());
        }

        this.props.dispatch(readerActions.closeReader());
    }

    render() {
        const close = !this.props.auth.isLoggedIn || !this.props.reader.book;

        return (
            <div className={style.container}>
                {
                    close &&
                    <Redirect to='/'/>
                }
                {
                    this.props.auth.isLoggedIn &&
                    <div>
                        <Button onClick={this.closeReader.bind(this)} className={style.closeBtn}>
                            <FaClose className={style.closeIcon}/>
                        </Button>
                        <FlipBook 
                            book={this.props.reader.book}
                            page={this.props.reader.remotePage}
                            onChangePage={this.onChangePage.bind(this)}
                        />
                        {
                            this.props.invitation.accepted &&
                            <div>
                                <Pointer/>
                                <div 
                                    id='local-video' 
                                    className={[style.videoContainer, style.isLocalVideo].join(' ')}
                                ></div>
                                <div 
                                    id='remote-video' 
                                    className={[style.videoContainer, style.isRemoteVideo].join(' ')}
                                ></div>
                            </div>
                        }
                    </div>
                }
            </div>
        );
    }
}

export default connect((state) => {
    return {
        auth: state.auth,
        reader: state.reader,
        invitation: state.invitation
    };
})(Reader);
