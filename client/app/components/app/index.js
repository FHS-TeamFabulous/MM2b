import React from 'react';
import { connect } from 'react-redux';
import * as socketActions from 'app/actions/socket';
import './global.scss';

class App extends React.Component {
    componentDidMount() {
        this.props.dispatch(socketActions.connect());
    }

    render() {
        return(
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default connect()(App);
