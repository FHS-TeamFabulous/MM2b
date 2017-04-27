import React from 'react';
import style from './style.scss';
import CustomButton from './../button';
import {Modal} from 'react-bootstrap';
import {closeModal, openInviteModal} from './../../actions/modal-actions';
import {logIn} from './../../actions/auth-actions';
import { connect } from 'react-redux';


class LoginModalContentComponente extends React.Component {
    render() {
        return (
            <div>
                <Modal.Body className={style.bodyContent}>
                    <p className={style.loginModalParagraph}>Bitte geben Sie einen Usernamen ein um Jemanden vorlesen zu können:</p>
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
                    <div className="pull-right">
                        <CustomButton onClick={this.closeModal.bind(this)} className={'defaultBtn'}>
                            Cancel
                        </CustomButton>
                    </div>
                </Modal.Footer>
            </div>
        );
    }

    logIn() {
        let username = document.getElementById('username').value;
        this.props.dispatch(logIn(username));
        this.props.dispatch(openInviteModal());
    }

    closeModal() {
        this.props.dispatch(closeModal());
    }
}


export default connect()(LoginModalContentComponente);

