import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import FlipBook from 'app/components/flipbook';
import style from './style.scss';
import { Button } from 'react-bootstrap';
import FaClose from 'react-icons/lib/fa/close';
import * as readerActions from 'app/actions/reader';
import * as webRTCActions from 'app/actions/webrtc';

class Reader extends React.Component {
    componentWillMount() {
        this.readingTogether = this.props.invitation.accepted;
    }

    componentDidMount() {
        if (this.readingTogether) {
            this.props.dispatch(webRTCActions.connect('local-video', 'remote-video'));
        }
    }

    onChangePage() {

    }

    closeReader() {
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
                            onChangePage={this.onChangePage.bind(this)}
                        />
                        {
                            this.readingTogether &&
                            <div>
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
