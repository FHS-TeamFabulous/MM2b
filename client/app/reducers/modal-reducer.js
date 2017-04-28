import { types } from 'app/actions/modal-actions';
import { types as communicationTypes} from 'app/actions/communication-actions';

const initialState = {
    show: false,
    selectedItem: {},
    modalType: null,
    availabilityOfButton: true
};

function modalReducer(state = initialState, action) {
    switch (action.type) {
        case types.LOGIN:
            return Object.assign({}, state, {
                modalType: 'loginModal',
                show: true
            });
        case types.INVITE:
            return Object.assign({}, state, {
                modalType: 'inviteModal',
                show: true
            });
        case types.CLOSEMODAL:
            return Object.assign({}, state, {
                show: true,
                modalType: 'closeModal'
            });
        case types.CLOSE:
            return Object.assign({}, state, {
                show: false,
                modalType: null,
                selectedItem: {}
            });
        case types.SELECT:
            return Object.assign({}, state, {
                selectedItem: action.payload.itemValue
            });
        case types.AVAILABILITYBUTTONFALSE:
            return Object.assign({}, state, {
                availabilityOfButton: true
            });
        case types.AVAILABILITYBUTTONTRUE:
            return Object.assign({}, state, {
                availabilityOfButton: false
            });
        case communicationTypes.INVITE_RECEIVED:
            return Object.assign({}, state, {
                modalType: 'receiveInviteModal',
                show: true
            });
    }

    return state;
}

export default modalReducer;
