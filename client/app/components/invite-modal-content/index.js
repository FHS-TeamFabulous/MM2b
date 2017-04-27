import React from 'react';
import style from './style.scss';
import CustomButton from './../button';
import {Modal} from 'react-bootstrap';
import {closeModal} from './../../actions/modal-actions';
import { connect } from 'react-redux';
import Select from 'react-select';
import SelectItem from 'app/components/select-item';

var options = [
    { value: 'one', label: "hallo" },
    { value: 'two', label: "hall2" }
];

class InviteModalContentComponente extends React.Component {
    render() {
        return (
            <div>
                <Modal.Body className={style.bodyContent}>
                    <p className={style.loginModalParagraph}>Wählen sie einen User aus mit dem Sie lesen wollen!</p>
                    <div className={style.selectWrapper}>
                        <Select name="form-field-name" options={options}/>
                    </div>
                </Modal.Body>
                <Modal.Footer className={style.footerContent}>
                    <CustomButton onClick={this.closeModal.bind(this)} className={"defaultBtn"}>
                        Cancel
                    </CustomButton>
                </Modal.Footer>
            </div>
        );
    }

    closeModal() {
        this.props.dispatch(closeModal());
    }
}

function cleanInput(inputValue) {
    // Strip all non-number characters from the input
    return inputValue.replace(/[^0-9]/g, "");
}

export default connect()(InviteModalContentComponente);

