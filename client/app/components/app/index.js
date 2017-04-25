import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {

    componentDidMount() {
        const server = this.props.server || 'http://localhost:3000';
        const name = prompt('login');

        this.client = Client({
            name
        });
        console.log(this.props.constraints);
        this.client.signals$.subscribe(message => console.log('[App] signal: ', message));
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
        connected: state.signaling.connected
    }
};

export default connect(mapStateToProps)(App);
