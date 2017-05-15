import * as booksOverviewActions from 'app/actions/books-overview';

const initialState = {
    books: {}
};

function booksReducer(state = initialState, action) {
    switch (action.type) {
        case booksOverviewActions.types.RECEIVE:
            return Object.assign({}, state, {
                books: action.data.data.reduce((acc, book) => {
                    acc[book.id] = book;
                    return acc;
                }, {})
            });
    }

    return state;
}

export default booksReducer;
