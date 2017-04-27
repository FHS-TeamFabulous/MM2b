import { types } from 'app/actions/modal-actions';

const initialState = {
    show: false
};

function modalReducer(state = initialState, action) {
    switch (action.type) {
        case types.OPEN:
            return Object.assign({}, state, {
                show: true
            });

        case types.CLOSE:
            return Object.assign({}, state, {
                show: false
            });
    }

    return state;
}

export default modalReducer;
