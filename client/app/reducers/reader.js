import * as readerActions from 'app/actions/reader';

const initialState = {
    book: null,
    remotePage: 1,
    leaver: null
};

function readerReducer(state = initialState, action) {
    switch (action.type) {
        case readerActions.types.SET_READER_BOOK:
            return Object.assign({}, state, {
                book: action.book
            });

        case readerActions.types.UNSET_READER_BOOK:
            return Object.assign({}, state, {
                book: null,
                remotePage: 1,
            });

        case readerActions.types.READER_LEFT_RECEIVED:
            return Object.assign({}, state, {
                book: null,
                remotePage: 1,
                leaver: action.leaver
            });

        case readerActions.types.READER_LEAVER_UNSET:
            return Object.assign({}, state, {
                leaver: null
            });

        case readerActions.types.READER_SET_PAGE:
            return Object.assign({}, state, {
                remotePage: action.page
            });
    }

    return state;
}

export default readerReducer;
