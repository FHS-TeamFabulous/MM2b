const types = {
    OPEN: 'OPEN_MODAL',
    CLOSE: 'CLOSE_MODAL'
};

function openModal() {
    return {
        type: types.OPEN
    }
}

function closeModal() {
    return {
        type: types.CLOSE
    }
}

export { types, openModal, closeModal };
