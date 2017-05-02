import React from 'react';
import style from './style.scss';
import BookItem from './../book-item';

export default class BookCollection extends React.Component {
    render() {

        return (
            <div>
                <h3>Bücher:</h3>
                {
                    Object.keys(this.props.books)
                        .map(id => this.props.books[id])
                        .map(book => (<BookItem key={book.id} item={book}/>))
                }
            </div>
        );
    }
}

BookCollection.defaultProps = {
    books: []
};

