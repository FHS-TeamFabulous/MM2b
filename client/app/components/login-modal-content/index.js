import React from 'react';
import style from './style.scss';
import CustomButton from './../button';
import {Modal} from 'react-bootstrap';
import {closeModal} from './../../actions/modal-actions';
import {logIn} from './../../actions/auth-actions';
import { connect } from 'react-redux';


class LoginModalContentComponente extends React.Component {
    render() {
        return (
            <div>
                <Modal.Body className={style.bodyContent}>
                    <p className={style.loginModalParagraph}>Bitte geben Sie einen Usernamen ein um Jemanden vorlesen zu können:</p>
                    <div className={style.formWrapper}>
                        <label>Username: </label>
                        <div className={style.inputWrapper}>
                            <input id="username" placeholder="Username"/>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className={style.footerContent}>
                    <CustomButton clickHandler={this.logIn.bind(this)} type={"modalLoginButton"} content={"Login"}/>
                    <CustomButton clickHandler={this.closeModal.bind(this)} type={"modalCancelButton"} content={"Cancel"}/>
                </Modal.Footer>
            </div>
        );
    }

    logIn() {
        let username = document.getElementById("username").value;
        this.props.dispatch(logIn(username));
    }

    closeModal() {
        this.props.dispatch(closeModal());
    }
}


export default connect()(LoginModalContentComponente);

