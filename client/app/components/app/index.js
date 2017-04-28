import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from './style.scss';
import {openLoginModal} from 'app/actions/modal-actions';

class App extends Component {
    componentDidMount() {
        this.openLoginModal();
    }

    render() {
        return(
            <div>
                {this.props.children}
            </div>
        )
    }

    openLoginModal() {
        this.props.dispatch(openLoginModal());
    }
}

const mapStateToProps = state => {
    return {}
};

export default connect(mapStateToProps)(App);
