import React from 'react';
import style from './style.scss';
import CustomButton from './../button';
import {Modal} from 'react-bootstrap';
import {closeModal, openInviteModal, disableButton} from './../../actions/modal-actions';
import { connect } from 'react-redux';
import { logIn } from 'app/actions/auth-actions';
import * as actions from 'app/actions/communication-actions';


class LoginModalContentComponente extends React.Component {
    render() {
        return (
            <div>
                <Modal.Body className={style.bodyContent}>
                    <p className={style.loginModalParagraph}>
                        Bitte geben Sie einen Usernamen ein um Jemanden vorlesen zu können:
                    </p>
                    <div className={style.formWrapper}>
                        <label>Username:</label>
                        <div className={style.inputWrapper}>
                            <input id="username" placeholder="Username"/>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className={style.footerContent}>
                    <div className="pull-right">
                        <CustomButton onClick={this.logIn.bind(this)} className={'defaultBtn'}>
                            Login
                        </CustomButton>
                    </div>
                </Modal.Footer>
            </div>
        );
    }

    logIn() {
        let username = document.getElementById('username').value;

        this.props.dispatch(logIn(username));
        this.props.dispatch(actions.login(username));
        this.props.dispatch(disableButton());

        this.closeModal();
    }

    closeModal() {
        this.props.dispatch(closeModal());
    }
}


export default connect()(LoginModalContentComponente);

