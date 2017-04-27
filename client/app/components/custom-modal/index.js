import React from 'react';
import style from './style.scss';
import CustomButton from './../button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {Modal} from 'react-bootstrap';
import {closeModal} from 'app/actions/modal-actions';

import FaClose from 'react-icons/lib/fa/close';

import LoginModalContent from 'app/components/login-modal-content';
import InviteModalContent from 'app/components/invite-modal-content';

class CustomModal extends React.Component {
    render() {
        return (
            <div>
                <Modal className={style.modalWrapper} show={this.props.show} onHide={this.closeModal.bind(this)} container={this} >
                    <div className={style.contentWrapper}>
                        <Modal.Header className={style.modalHeader}>
                            <div className={style.modalLogoWrapper}>
                                <img className={style.logo} alt="vorlesen-verbindet-logo" src="/assets/images/vorlesen-verbindet_logo.jpg"/>
                            </div>
                            <CustomButton onClick={this.closeModal.bind(this)} className={"modalCloseButton"}>
                                <FaClose className={style.icon}/>
                            </CustomButton>
                        </Modal.Header>
                    </div>
                    {this.displayModal(this.props.loggingStatus)}
                </Modal>
            </div>
        );
    }

    closeModal() {
        this.props.dispatch(closeModal());
    }

    displayModal(loggingStatus) {
        switch (loggingStatus) {
            case false:
                return <LoginModalContent/>;
            case true:
                return <InviteModalContent/>;
        }
    }
}
function mapStateToProps(state) {

    return {
        show: state.modalState.show,
        user: state.authState.username,
        loggingStatus: state.authState.isLoggedIn
    }
}

export default connect(mapStateToProps)(CustomModal);

