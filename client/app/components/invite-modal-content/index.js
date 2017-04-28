import React from 'react';
import style from './style.scss';
import CustomButton from 'app/components/button';
import {Modal} from 'react-bootstrap';
import {closeModal, selectItem, enableButton, disableButton} from 'app/actions/modal-actions';
import * as actions from 'app/actions/communication-actions';
import { connect } from 'react-redux';
import Select from 'react-select';
import Avatar from 'app/components/avatar';
import { createConnection } from 'app/actions/communication-actions';
import SelectItem from 'app/components/select-item';

class InviteModalContentComponente extends React.Component {

    render() {
        const options = this.props.clients.map((client) =>{
            return {
                value: {
                    id: client.id,
                    name: client.name,
                    avatar: client.avatar
                },
                label: <SelectItem username={client.name} avatar={client.avatar}/>
            }
        });

        return (
            <div>
                <Modal.Body className={style.bodyContent}>
                    <p className={style.loginModalParagraph}>Wählen sie einen User aus mit dem Sie lesen wollen!</p>
                    <div className={style.selectWrapper}>
                        <Select value={this.props.selectedItemValue.name} name="form-field-name" options={options} onChange={this.changeItem.bind(this)}/>
                    </div>
                    <Avatar name={this.props.selectedItemValue.name} url={this.props.selectedItemValue.avatar} isLoading={this.props.isInviting} />
                </Modal.Body>
                <Modal.Footer className={style.footerContent}>
                    <div className="pull-right">
                        <CustomButton onClick={this.submit.bind(this)} className={"defaultBtn"} availability={this.props.availabilityOfButton || this.props.isInviting}>
                            { (this.props.isInviting) ? 'Verbinde...' : 'Verbinden'}
                        </CustomButton>
                    </div>
                    <div className="pull-right">
                        <CustomButton onClick={this.closeModal.bind(this)} className={"defaultBtn"}>
                            Abbrechen
                        </CustomButton>
                    </div>
                </Modal.Footer>
            </div>
        );
    }

    changeItem(selectedObject) {
        if (selectedObject !== null) {
            this.props.dispatch(enableButton());
            this.props.dispatch(selectItem(selectedObject.value));
        } else {
            this.props.dispatch(selectItem());
            this.props.dispatch(disableButton());
        }
    }

    closeModal() {
        this.props.dispatch(closeModal());
        this.props.dispatch(actions.createCancelInvite(this.props.selectedItemValue.name));
    }

    submit() {
        this.props.dispatch(actions.createInvite(this.props.selectedItemValue.name));
    }
}

function mapStateToProps(state) {
    return {
        selectedItemValue: state.modalState.selectedItem,
        clients: state.communication.clients,
        availabilityOfButton: state.modalState.availabilityOfButton,
        isInviting: state.communication.isInviting,
        bookId: state.booksState.selectedBookId
    }
}

export default connect(mapStateToProps)(InviteModalContentComponente);

