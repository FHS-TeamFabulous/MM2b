import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {

    componentDidMount() {
        const server = this.props.server || 'http://localhost:3000';
        const name = prompt('login');

        /*this.client.signals$.subscribe(message => console.log('[App] signal: ', message));*/
    }

    render() {
        return(
            <div className="app">
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
