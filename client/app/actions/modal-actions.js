const types = {
    LOGIN: 'OPEN_LOGIN_MODAL',
    INVITE: 'OPEN_INVITE_MODAL',
    CLOSE: 'CLOSE_MODAL',
    SELECT: 'SELECT_ITEM',
    CLOSEMODAL: 'CLOSE_MODAL_TYPE',
    AVAILABILITYBUTTONFALSE: 'AVAILABILITY_OF_BUTTON_FALSE',
    AVAILABILITYBUTTONTRUE: 'AVAILABILITY_OF_BUTTON_TRUE'
};

function openLoginModal() {
    return {
        type: types.LOGIN
    }
}

function openInviteModal() {
    return {
        type: types.INVITE
    }
}

function closeModal() {
    return {
        type: types.CLOSE
    }
}

function selectItem(value) {
    return {
        type: types.SELECT,
        payload: {
            itemValue: value
        }
    }
}

function openCloseModal() {
    return {
        type: types.CLOSEMODAL
    }
}

function disableButton() {
    return {
        type: types.AVAILABILITYBUTTONFALSE
    }
}
function enableButton() {
    return {
        type: types.AVAILABILITYBUTTONTRUE
    }
}

export { types, openLoginModal, openInviteModal, closeModal, selectItem, openCloseModal, disableButton, enableButton };
