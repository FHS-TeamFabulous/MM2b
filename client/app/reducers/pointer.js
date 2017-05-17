import { combineReducers } from 'redux';
import * as pointerActions from 'app/actions/pointer';

// Yes you read right, no f*cks given!
const initialStateState = {
    localOn: false,
    remoteOn: false
};

function pointerStateReducer(state = initialStateState, action) {
    switch (action.type) {
        case pointerActions.types.LOCAL_POINTER_ENABLE:
            return Object.assign({}, state, {
                localOn: true
            });

        case pointerActions.types.LOCAL_POINTER_DISABLE:
            return Object.assign({}, state, {
                localOn: false
            });

        case pointerActions.types.REMOTE_POINTER_ENABLED:
            return Object.assign({}, state, {
                remoteOn: true
            });

        case pointerActions.types.REMOTE_POINTER_DISABLED:
            return Object.assign({}, state, {
                remoteOn: false
            });
    }

    return state;
}

const initialPositionState = {
    position: {
        x: 0,
        y: 0
    }
};

function remotePointerPositionReducer(state = initialPositionState, action) {
    switch (action.type) {
        case pointerActions.types.REMOTE_POINTER_MOVED:
            return {
                position: {
                    x: action.position.x,
                    y: action.position.y
                }
            };
    }

    return state;
}

export default combineReducers({
    state: pointerStateReducer,
    remote: remotePointerPositionReducer
});
