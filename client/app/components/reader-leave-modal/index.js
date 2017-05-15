import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import CoreModal from 'app/components/core-modal';
import * as readerActions from 'app/actions/reader';

class ReaderLeaveModal extends React.Component {
    close() {
        this.props.dispatch(readerActions.unsetLeaver());
    }
    
    render() {
        const { leaver } = this.props;

        return (
            <CoreModal
                show={!!leaver}
                showClose={true}
                showRejectBtn={false}
                confirmText={'Ok'}
                onConfirm={this.close.bind(this)}
                onClose={this.close.bind(this)}
            >
                {
                    leaver &&
                    <Modal.Body>
                        <p>
                            <strong>{leaver.name}</strong> hat den Raum verlassen.
                        </p>
                    </Modal.Body>
                }
            </CoreModal>
        );
    }
}

export default connect((state) => {
    return {
        leaver: state.reader.leaver
    };
})(ReaderLeaveModal);
