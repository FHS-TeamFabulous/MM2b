import React from 'react';
import style from './style.scss';
import CustomButton from './../button';
import {Modal} from 'react-bootstrap';
import {closeModal} from './../../actions/modal-actions';
import {logIn} from './../../actions/auth-actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { closeBook } from 'app/actions/books-actions';


class CloseModalContentComponente extends React.Component {
    render() {
        return (
            <div>
                <Modal.Body className={style.bodyContent}>
                    <h4 className={style.message}>Wollen sie das Buch wirklich verlassen?</h4>
                </Modal.Body>
                <Modal.Footer className={style.footerContent}>
                    <div className="pull-right">
                        <Link to={"/"}>
                            <CustomButton onClick={this.submit.bind(this)} className={'defaultBtn'}>
                                Accept
                            </CustomButton>
                        </Link>
                    </div>
                    <div className="pull-right">
                        <CustomButton onClick={this.close.bind(this)} className={'defaultBtn'}>
                            Cancel
                        </CustomButton>
                    </div>
                </Modal.Footer>
            </div>
        );
    }

    submit() {
        this.props.dispatch(closeBook());
        this.close();
    }

    close() {
        this.props.dispatch(closeModal());
    }
}


export default connect()(CloseModalContentComponente);

