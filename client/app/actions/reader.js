import * as socketActions from 'app/actions/socket';
import * as webRTCActions from 'app/actions/webrtc';

export const types = {
    SET_READER_BOOK: 'SET_READER_BOOK',
    UNSET_READER_BOOK: 'UNSET_READER_BOOK',
    READER_LEAVE: 'READER_LEAVE',
    READER_LEFT_RECEIVED: 'READER_LEFT_RECEIVED',
    READER_LEAVER_UNSET: 'READER_LEAVER_UNSET'
};

export function openReader(id) {
    return (dispatch, getState) => {
        dispatch(setBook(id, getState()));
    };
}

export function closeReader() {
    return (dispatch, getState) => {
        const state = getState();

        if (state.invitation.accepted) {
            const receiver = state.invitation.accepted.opponent;

            dispatch(leaveReader());
            dispatch(socketActions.leaveReader(receiver));
            dispatch(webRTCActions.disconnect());
        }

        dispatch(unsetBook());
    };
}

export function setBook(id, state) {
    return {
        type: types.SET_READER_BOOK,
        book: state.booksOverview.books[id]
    };
}

export function unsetBook() {
    return {
        type: types.UNSET_READER_BOOK
    };
}

export function leaveReader(receiver) {
    return {
        type: types.READER_LEAVE,
        receiver
    }
}

export function leftReaderReceived(leaver) {
    return {
        type: types.READER_LEFT_RECEIVED,
        leaver
    }
}

export function unsetLeaver() {
    return {
        type: types.READER_LEAVER_UNSET
    }
}
