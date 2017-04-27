import { types } from 'app/actions/modal-actions';

const initialState = {
    show: false,
    selectedItem: 0,
    modalType: ""
};

function modalReducer(state = initialState, action) {
    switch (action.type) {
        case types.LOGIN:
            return Object.assign({}, state, {
                modalType: "loginModal",
                show: true
            });
        case types.INVITE:
            return Object.assign({}, state, {
                modalType: "inviteModal",
                show: true
            });
        case types.CLOSEMODAL:
            return Object.assign({}, state, {
                show: true,
                modalType: "closeModal"
            });
        case types.CLOSE:
            return Object.assign({}, state, {
                show: false,
                modalType: ""
            });
        case types.SELECT:
            return Object.assign({}, state, {
                selectedItem: action.payload.itemValue
            });
    }

    return state;
}

export default modalReducer;
