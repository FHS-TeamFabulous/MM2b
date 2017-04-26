import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createOffer } from '../../actions/signaling.actions';

class VideoComponent extends Component {

    offer() {
        const name = prompt('connect to');
        this.props.dispatch(createOffer(name))
    }

    render() {
        return (
            <div className="video">
                <video ref="localVid" autoPlay src={this.props.video.src}></video>
                <button onClick={this.offer.bind(this)}>Offer</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        clients: state.signaling.clients,
        connected: state.signaling.connected,
        video: state.signaling.video
    };
};

export default connect(mapStateToProps)(VideoComponent);
