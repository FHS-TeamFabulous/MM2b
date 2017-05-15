import React from 'react';
import style from './style.scss';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import CoreModal from 'app/components/core-modal';
import * as invitationActions from 'app/actions/invitation';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class InviteModal extends React.Component {
    constructor() {
        super();

        this.state = {
            selectedUser: null,
            invited: false
        };
    }

    invite() {
        this.props.dispatch(invitationActions.sendInvitation(
            this.state.selectedUser.value,
            this.props.bookId
        ));

        this.setState(() => ({
            invited: true
        }));
    }

    onReject() {
        if (this.props.invitation.sentPending) {    
            this.props.dispatch(invitationActions.cancelInvitation(this.state.selectedUser.value));
            this.setState(() => ({
                invited: false
            }));
        } else {
            this.props.onReject();
        }
    }

    onClose() {
        if (this.props.invitation.sentPending) {    
            this.props.dispatch(invitationActions.cancelInvitation(this.state.selectedUser.value));
        }

        this.setState(() => ({
            selectedUser: null,
            invited: false
        }));

        this.props.onClose();
    }

    selectUser(selected) {
        this.setState(() => ({
            selectedUser: selected,
            invited: false
        }));
    }

    renderOption(option) {
        return (
            <div>
                <img className={style.selectItemImage} src={option.avatar}/>
                <span>{option.label}</span>
            </div>
        );
    }

    renderValue(option) {
        return (
            <div>
                <img className={style.selectItemImage} src={option.avatar}/>
                <span>{option.name}</span>
            </div>
        );
    }

    render() {
        const options = this.props.clients.map((client) => {
            return Object.assign({}, client, {
                value: client,
                label: client.name
            });
        });

        const loader = (
            <div className={style.loader}>
                <div/>
                <div/>
                <div/>
            </div>
        );

        const { id, name, avatar } = this.state.selectedUser || {};
        const showDeclineMsg = !this.props.invitation.sentPending && this.state.invited

        return (
            <CoreModal
                show={this.props.show}
                showRejectBtn={true}
                rejectText={'Abbrechen'}
                confirmText={'Einladen'}
                disableConfirm={!this.state.selectedUser || !!this.props.invitation.sentPending}
                onClose={this.onClose.bind(this)}
                onReject={this.onReject.bind(this)}
                onConfirm={this.invite.bind(this)}
            >
                <Modal.Body>
                    <p>
                        Wählen sie einen Nutzer zum gemeinsamen Lesen aus!
                    </p>
                    <div className={style.selectWrapper}>
                        <Select 
                            options={options}
                            value={this.state.selectedUser}
                            placeholder={'Bitte Nutzer wählen...'}
                            noResultsText={'Keine Nutzer online'}
                            disabled={!!this.props.invitation.sentPending}
                            onChange={this.selectUser.bind(this)}
                            optionRenderer={this.renderOption.bind(this)}
                            valueRenderer={this.renderValue.bind(this)}
                        />
                    </div>
                    {
                        id &&
                        <div className={style.user}>
                            <img className={style.userImg} src={avatar} />
                            <p className={style.userName}>{name}</p>
                            {this.props.invitation.sentPending && loader}
                            {
                                showDeclineMsg && 
                                <div className='alert alert-danger alert-simple'>
                                    <strong>{name}</strong> hat die Einladung abgelehnt.
                                </div>
                            }
                        </div>
                    }
                </Modal.Body>
            </CoreModal>
        );
    }
}

export default connect((state) => {
    return {
        clients: state.auth.clients,
        invitation: state.invitation
    };
})(InviteModal);
