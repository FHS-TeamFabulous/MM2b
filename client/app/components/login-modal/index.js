import React from 'react';
import style from './style.scss';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import FaSignIn from 'react-icons/lib/fa/sign-in';
import CoreModal from 'app/components/core-modal';
import * as authActions from 'app/actions/auth';

class LoginModal extends React.Component {
    constructor() {
        super();

        this.state = {
            hasSubmitted: false,
            isValidLogin: false
        };
    }

    render() {
        const { hasSubmitted, isValidLogin } = this.state;

        return (
            <CoreModal
                show={this.props.show}
                showRejectBtn={false}
                showClose={false}
                confirmText={(<span><FaSignIn/>Anmelden</span>)}
                onConfirm={this.login.bind(this)}
            >
                <Modal.Body>
                    <p>Bitte geben Sie zum Anmelden einen Usernamen ein:</p>
                    <form className={style.formWrapper} onSubmit={this.login.bind(this)}>
                        <label>Nutzername:</label>
                        <div className={style.inputWrapper}>
                            <input ref='userName' placeholder='Username'/>
                        </div>
                    </form>
                    {
                        (hasSubmitted && !isValidLogin) &&
                        <div className='alert alert-danger alert-simple' role='alert'>
                            Bitte geben Sie einen passenden Usernamen ein!
                        </div>
                    }
                </Modal.Body>
            </CoreModal>
        );
    }

    login(event) {
        const userName = this.refs.userName.value;
        const isValidLogin = this.validateLogin(); 

        event.preventDefault();

        this.setState(() => ({
            isValidLogin,
            hasSubmitted: true
        }));

        if (isValidLogin) {
            this.props.dispatch(authActions.login(userName));
        }
    }

    validateLogin() {
        const userName = this.refs.userName.value;

        return !!userName.trim().length;
    }
}

export default connect()(LoginModal);
