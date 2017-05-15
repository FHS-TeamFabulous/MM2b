export const types = {
    RECEIVE: 'RECEIVE_BOOK'
};

export function receiveBooks(data) {
    return {
        type: types.RECEIVE,
        data: data
    };
}

export function fetchBooks() {
    return (dispatch) => {
        return fetch(`/api/books/`)
            .then(res => res.json())
            .then(data => dispatch(receiveBooks(data)));
    };
}
