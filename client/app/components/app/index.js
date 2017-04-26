import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createLogin } from 'app/actions/signaling.actions';

class App extends Component {

    render() {
        return(
            <div>
                {this.props.children}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        constraints: state.signaling.constraints,
        connected: state.signaling.connected,
        clients: state.signaling.clients
    }
};

export default connect(mapStateToProps)(App);
