import React from 'react';
import style from './style.scss';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import FaClose from 'react-icons/lib/fa/close';

export default class CoreModal extends React.Component {
    render() {
        return (
            <div>
                <Modal
                    className={style.wrapper}
                    backdrop={this.props.backdrop} 
                    show={this.props.show}
                    onExited={this.props.onClose}
                >
                    <div className={style.contentWrapper}>
                        <Modal.Header className={style.header}>
                            <div className={style.logoContainer}>
                                <img className={style.logo} alt='Vorlesen-Verbindet' src='/images/logo.jpg'/>
                            </div>
                            {
                                this.props.showClose &&
                                <Button onClick={this.props.onClose} className={style.closeBtn}>
                                    <FaClose className={style.closeIcon}/>
                                </Button>
                            }
                        </Modal.Header>
                    </div>
                    
                    {this.props.children}

                    <Modal.Footer className={style.footerContent}>
                        <div className='pull-right'>
                            {
                                this.props.showRejectBtn &&
                                <Button onClick={this.props.onReject}>
                                    {this.props.rejectText}
                                </Button>
                            }
                            <Button onClick={this.props.onConfirm} disabled={this.props.disableConfirm}>
                                {this.props.confirmText}
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

CoreModal.defaultProps = {
    backdrop: true,
    showClose: true,
    closeAble: true,
    showRejectBtn: true,
    disableConfirm: false,
    onClose: () => {}
};
