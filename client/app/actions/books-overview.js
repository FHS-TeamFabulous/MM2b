export const types = {
    RECEIVE: 'RECEIVE_BOOK',
};

export function receiveBooks(data) {
    return {
        type: types.RECEIVE,
        data,
    };
}

export function fetchBooks() {
    return dispatch => fetch('/api/books/')
        .then(res => res.json())
        .then(data => dispatch(receiveBooks(data)));
}
