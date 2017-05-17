import * as socketActions from 'app/actions/socket';

export const types = {
    LOCAL_POINTER_ENABLE: 'LOCAL_POINTER_ENABLE',
    LOCAL_POINTER_DISABLE: 'LOCAL_POINTER_DISABLE',
    REMOTE_POINTER_ENABLED: 'REMOTE_POINTER_ENABLED',
    REMOTE_POINTER_DISABLED: 'REMOTE_POINTER_DISABLED',
    REMOTE_POINTER_MOVED: 'REMOTE_POINTER_MOVED'
};

export function enablePointer() {
    return {
        type: types.LOCAL_POINTER_ENABLE
    };
}

export function disablePointer() {
    return {
        type: types.LOCAL_POINTER_DISABLE
    };
}

export function sendPointerPosition(x, y) {
    return (dispatch, getState) => {
        const state = getState();
        const relScreenPos = calcAbsToRelPos(x, y);

        dispatch(socketActions.sendPointerPosition(
            state.invitation.accepted.opponent,
            relScreenPos.x, 
            relScreenPos.y
        ));
    };
}

export function startPointer(startX, startY, cb) {
    return (dispatch, getState) => {
        const state = getState();
        const onMouseMove = (event) => {
            const { clientX, clientY } = event;

            if (typeof cb === 'function') {
                cb(clientX, clientY);
            }

            dispatch(sendPointerPosition(
                clientX, 
                clientY
            ));
        };

        dispatch(enablePointer());
        dispatch(socketActions.sendPointerEnable(
            state.invitation.accepted.opponent,
            startX, 
            startY
        ));

        window.addEventListener('mousemove', onMouseMove);

        return () => window.removeEventListener('mousemove', onMouseMove);
    }
}

export function stopPointer() {
    return (dispatch, getState) => {
        const state = getState();

        dispatch(disablePointer());
        dispatch(socketActions.sendPointerDisable(
            state.invitation.accepted.opponent
        ));
    }
}

export function receivedPointerEnabled(sender, pos) {
    return {
        type: types.REMOTE_POINTER_ENABLED,
        position: calcRelToAbsPos(pos.x, pos.y),
        sender,
    };
}

export function receivedPointerDisabled(sender) {
    return {
        type: types.REMOTE_POINTER_DISABLED,
        sender,
    };
}

export function receivedPointerMoved(sender, pos) {
    return {
        type: types.REMOTE_POINTER_MOVED,
        position: calcRelToAbsPos(pos.x, pos.y),
        sender,
    };
}

function calcAbsToRelPos(x, y) {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    return {
        x: x / windowWidth,
        y: y / windowHeight
    }
}

function calcRelToAbsPos(x, y) {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    return {
        x: windowWidth * x,
        y: windowHeight * y
    }
}
