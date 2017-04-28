import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from './style.scss';

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
    return {}
};

export default connect(mapStateToProps)(App);
