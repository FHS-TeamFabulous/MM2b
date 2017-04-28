const types = {
    POINTER_DISABLE: 'POINTER_DISABLE',
    POINTER_ENABLE: 'POINTER_ENABLE',
    POINTER_MOVE: 'POINTER_MOVE'
};

function disablePointer() {
    return {
        type: types.POINTER_DISABLE
    };
}

function enablePointer(localControl) {
    return {
        type: types.POINTER_ENABLE,
        localControl
    };
}

function startPointer() {
    return dispatch => {
        dispatch(enablePointer(true));

        return window.addEventListener('mousemove', ev => {
            let relScreenPos = calcAbsToRelPos({ x: ev.pageX, y: ev.pageY });
            dispatch(movePointer({ x: ev.pageX, y: ev.pageY }));
        });
    }
}

function stopPointer(listener) {
    return dispatch => {
        dispatch(disablePointer());
        window.removeEventListener(listener);
    }
}

function movePointer(position) {
    return {
        type: types.POINTER_MOVE,
        position
    };
}

function calcAbsToRelPos({ x, y }) {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    return {
        x: x / windowWidth,
        y: y / windowHeight
    }
}

function calcRelToAbsPos({ x, y }) {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    return {
        x: windowWidth * x,
        y: windowHeight * y
    }
}

export {
    types,
    startPointer,
    stopPointer
};
