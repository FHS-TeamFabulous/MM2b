import { types } from 'app/actions/books-actions';

const initialState = {
    isDone: false,
    isFetching: false,
    books: {},
    selectedBookId: 'Foxy-Joxy-Plays-A-Trick',
    selectedBookPage: 1
};

function tryPageNext(currentPage, pagesCount) {
    currentPage = currentPage + 2;

    if (currentPage > pagesCount) {
        currentPage = pagesCount;
    }

    return currentPage;
}

function tryPagePrev(currentPage) {
    currentPage = currentPage - 2;

    if (currentPage < 1) {
        currentPage = 1;
    }

    return currentPage;
}

function booksReducer(state = initialState, action) {
    switch (action.type) {
        case types.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isDone: false
            });

        case types.RECEIVE:
            return Object.assign({}, state, {
                isFetching: false,
                isDone: true,
                books: action.data.data.reduce((acc, book) => {
                    acc[book.id] = book;
                    return acc;
                }, {})
            });

        case types.SELECT_BOOK:
            return Object.assign({}, state, {
                selectedBookId: action.id 
            });

        case types.PAGE_NEXT:
            return Object.assign({}, state, {
                selectedBookPage: tryPageNext(
                    state.selectedBookPage, 
                    state.books[state.selectedBookId].pages.length
                )
            });

        case types.PAGE_PREV:
            return Object.assign({}, state, {
                selectedBookPage: tryPagePrev(state.selectedBookPage)
            });

        case types.PAGE_SET:
            return Object.assign({}, state, {
                selectedBookPage: action.page
            });
    }

    return state;
}

export default booksReducer;
