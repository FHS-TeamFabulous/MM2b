import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import CoreModal from 'app/components/core-modal';
import * as invitationActions from 'app/actions/invitation';
import * as readerActions from 'app/actions/reader';

class InviteReceivedModal extends React.Component {
    onReject() {
        const receiver = this.props.invitation.receivedPending.sender;

        this.props.dispatch(invitationActions.declineInvitation(receiver));
    }

    acceptInvitation() {
        const { sender, bookId } = this.props.invitation.receivedPending;

        this.props.dispatch(invitationActions.acceptInvitation(sender, bookId));
        this.props.dispatch(readerActions.openReader(bookId));
    }
    
    render() {
        const receivedPending = this.props.invitation.receivedPending;
        const { sender, bookId } = receivedPending || {};
        const book = this.props.books[bookId];

        return (
            <CoreModal
                show={!!receivedPending}
                showClose={false}
                showRejectBtn={true}
                rejectText={'Ablehnen'}
                confirmText={'Annehmen'}
                onReject={this.onReject.bind(this)}
                onConfirm={this.acceptInvitation.bind(this)}
            >
                {
                    receivedPending &&
                    <Modal.Body>
                        <p>
                            <strong>{sender.name}</strong> möchte 
                            mit Ihnen zusammen das Buch <strong>{book.title}</strong> lesen.
                        </p>
                    </Modal.Body>
                }
            </CoreModal>
        );
    }
}

export default connect((state) => {
    return {
        invitation: state.invitation,
        books: state.booksOverview.books
    };
})(InviteReceivedModal);
