import config from 'config';

const types = {
    REQUEST: 'REQUEST_BOOK',
    RECEIVE: 'RECEIVE_BOOK',
    SELECT_BOOK: 'SELECT_BOOK',
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

function selectBook(id) {
    return {
        type: types.SELECT_BOOK,
        id: id
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

export { types, fetchBooks, pageNext, pagePrev, setPage };
