import config from 'config';

const types = {
    REQUEST: 'REQUEST_BOOK',
    RECEIVE: 'RECEIVE_BOOK',
    SELECT_BOOK: 'SELECT_BOOK',
    CLOSE_BOOK: 'CLOSE_BOOK',
    PAGE_NEXT: 'PAGE_NEXT',
    PAGE_PREV: 'PAGE_PREV',
    PAGE_SET: 'PAGE_SET'
};

function requestBooks() {
    return {
        type: types.REQUEST
    };
}

function receiveBooks(data) {
    return {
        type: types.RECEIVE,
        data: data
    };
}

function fetchBooks() {
    return (dispatch) => {
        dispatch(requestBooks());

        return fetch(`${config.api.base}/books/`)
            .then(res => res.json())
            .then(data => dispatch(receiveBooks(data)));
    };
}

function shouldFetchBooks(state) {
    const booksState = state.booksState;
    
    if (booksState.isFetching) {
        return false;
    } else if (!Object.keys(booksState.books).length) {
        return true;
    }
}

function fetchBooksIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchBooks(getState())) {
            return dispatch(fetchBooks());
        } else {
            return Promise.resolve();
        }
    };
}

function selectBook(id) {
    return {
        type: types.SELECT_BOOK,
        id: id
    };
}

function closeBook() {
    return {
        type: types.CLOSE_BOOK
    };
}

function setPage(page) {
    return {
        type: types.PAGE_SET,
        page: page
    };
}

function pageNextLocal() {
    return {
        type: types.PAGE_NEXT
    };
}

function pagePrevLocal() {
    return {
        type: types.PAGE_PREV
    };
}

function pageNext() {
    return (dispatch) => {
        dispatch(pageNextLocal());
    };
}

function pagePrev() {
    return (dispatch) => {
        dispatch(pagePrevLocal());
    };
}

export { 
    types, 
    fetchBooksIfNeeded, 
    pageNext, 
    pagePrev, 
    setPage, 
    selectBook,
    closeBook,
};
