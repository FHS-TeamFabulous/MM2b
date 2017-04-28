import { combineReducers } from 'redux';
import { types } from 'app/actions/tools-actions';

const initialPointerState = {
    isOn: false,
    localControl: false,
    position: {
        x: 9999,
        y: 9999
    }
};

function pointerReducer(state = initialPointerState, action) {
    switch (action.type) {
        case types.POINTER_ENABLE:
            return Object.assign({}, state, {
                isOn: true,
                localControl: action.localControl
            });

        case types.POINTER_DISABLE:
            return Object.assign({}, state, {
                isOn: false,
                localControl: false
            });

        case types.POINTER_MOVE:
            return Object.assign({}, state, {
                position: action.position
            });
    }

    return state;
}

export default combineReducers({
    pointer: pointerReducer
});
