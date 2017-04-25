import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createOffer, createAnswer, createCandidate } from '../../actions/signaling.actions';

class VideoComponent extends Component {

    connect() {
        const name = prompt('connect to');
        this.props.dispatch(createOffer(name))
    }

    offer(name) {
    }

    render() {
        return (
            <div className="video">
                <video ref="localVid" autoPlay></video>
                <button onClick={this.offer.bind(this)}>Offer</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        clients: state.signaling.clients
    }
};

export default connect(mapStateToProps)(VideoComponent);
