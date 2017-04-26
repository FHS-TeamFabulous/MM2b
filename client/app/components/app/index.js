import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createLogin } from '../../actions/signaling.actions';

class App extends Component {

    componentDidMount() {
        const name = prompt('login');
        this.props.dispatch(createLogin(name));
    }

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
        clients: state.signaling.clients,
        user: state.signaling.user
    }
};

export default connect(mapStateToProps)(App);
