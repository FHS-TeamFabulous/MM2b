import config from 'config';

const types = {
    REQUEST: 'REQUEST_BOOK',
    RECEIVE: 'RECEIVE_BOOK'
};

function requestBooks() {
    return {
        type: types.REQUEST
    }
}

function receiveBooks(data) {
    return {
        type: types.RECEIVE,
        data: data
    }
}

function fetchBooks() {
    return (dispatch) => {
        dispatch(requestBooks());

        return fetch(`${config.api.base}/books/`)
            .then(res => res.json())
            .then(data => dispatch(receiveBooks(data)));
    }
}

export { types, fetchBooks };
