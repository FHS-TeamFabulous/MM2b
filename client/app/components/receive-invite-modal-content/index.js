import React from 'react';
import style from './style.scss';
import CustomButton from './../button';
import {Modal} from 'react-bootstrap';
import {closeModal, openInviteModal, disableButton} from './../../actions/modal-actions';
import { connect } from 'react-redux';
import { logIn } from 'app/actions/auth-actions';
import * as actions from 'app/actions/communication-actions';
import { Link } from 'react-router-dom';


class ReceiveInviteModalComponent extends React.Component {
    render() {
        return (
            <div>
                <Modal.Body className={style.bodyContent}>
                    <h3 className={style.inviteText}>this.props.clients[0].name möchte sie zum gemeinsamen Buch lesen einladen</h3>
                </Modal.Body>
                <Modal.Footer className={style.footerContent}>
                    <div className="pull-right">
                        <Link to={`/books/${this.props.bookId}`}>
                            <CustomButton onClick={this.acceptInvite.bind(this)} className={'defaultBtn'}>
                                Akzeptieren
                            </CustomButton>
                        </Link>
                    </div>
                    <div className="pull-right">
                        <CustomButton onClick={this.closeModal.bind(this)} className={'defaultBtn'}>
                            Abbrechen
                        </CustomButton>
                    </div>
                </Modal.Footer>
            </div>
        );
    }

    /*logIn() {
        let username = document.getElementById('username').value;
        console.log(username);
        this.props.dispatch(logIn(username));
        this.props.dispatch(actions.createLogin(username));
        this.props.dispatch(disableButton());
        this.props.dispatch(openInviteModal());
    }*/

    acceptInvite() {
        this.props.dispatch(actions.createInvitationAccepted(this.props.clients.name))
        this.closeModal();
    }

    closeModal() {
        this.props.dispatch(closeModal());
    }
}

function mapStateToProps(state) {
    return {
        clients: state.communication.clients,
        bookId: state.booksState.selectedBookId
    }
}


export default connect(mapStateToProps)(ReceiveInviteModalComponent);

