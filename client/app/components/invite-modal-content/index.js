import React from 'react';
import style from './style.scss';
import CustomButton from './../button';
import {Modal} from 'react-bootstrap';
import {closeModal, selectItem, enableButton, disableButton} from './../../actions/modal-actions';
import { connect } from 'react-redux';
import Select from 'react-select';
import Avatar from 'app/components/avatar';


import SelectItem from 'app/components/select-item';

var options = [
    { value: 1, label: <SelectItem username={"blub"}/> },
    { value: 2, label: <SelectItem username={"blub2"}/> }
];

class InviteModalContentComponente extends React.Component {
    render() {
        //console.log(this.props.availabilityOfButton);
        //console.log(this.props.selectedItemValue);
        /*const options = this.props.clients.map((client) =>{
            return {
                value: client.id,
                label: <SelectItem username={client.name}/>
            }
        });*/
        return (
            <div>
                <Modal.Body className={style.bodyContent}>
                    <p className={style.loginModalParagraph}>Wählen sie einen User aus mit dem Sie lesen wollen!</p>
                    <div className={style.selectWrapper}>
                        <Select value={this.props.selectedItemValue} name="form-field-name" options={options} onChange={this.changeItem.bind(this)}/>
                    </div>
                    <Avatar />
                </Modal.Body>
                <Modal.Footer className={style.footerContent}>
                    <div className="pull-right">
                        <CustomButton className={"defaultBtn"} availability={this.props.availabilityOfButton}>
                            Verbinden
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
        //console.log(value.value);
        if(selectedObject !== null)
        {
            this.props.dispatch(enableButton());
            this.props.dispatch(selectItem(selectedObject.value));
        }
        else {
            this.props.dispatch(selectItem(0));
            this.props.dispatch(disableButton());
        }
    }

    closeModal() {
        this.props.dispatch(closeModal());
    }
}

function mapStateToProps(state) {
    return {
        selectedItemValue: state.modalState.selectedItem,
        clients: state.communication.clients,
        availabilityOfButton: state.modalState.availabilityOfButton
    }
}

export default connect(mapStateToProps)(InviteModalContentComponente);

