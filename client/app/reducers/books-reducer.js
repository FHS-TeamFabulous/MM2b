import { types } from 'app/actions/books-actions';

const initialState = {
    isDone: false,
    isFetching: false,
    books: {},
    selectedBook: 'Foxy-Joxy-Plays-A-Trick'
};

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
    }

    return state;
}

export default booksReducer;
