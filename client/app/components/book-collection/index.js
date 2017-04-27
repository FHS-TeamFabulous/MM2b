import React from 'react';
import style from './style.scss';
import BookItem from './../book-item';

export default class BookCollection extends React.Component {
    render() {
        
        return (
            <div>
                <h3>Bücher:</h3>
                {
                    Object.values(this.props.books).map(book => (<BookItem key={book.id} item={book}/>))
                }
            </div>
        );
    }
}

BookCollection.defaultProps = {
    books: []
};

