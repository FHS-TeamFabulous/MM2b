import React from 'react';
import style from './style.scss';
import BookItem from './../book-item';

export default class BookCollection extends React.Component {
    render() {
        return (
            <div>
                <h3>ab {this.props.array[0].ageOf} Jahre</h3>
                {this.props.array.map(book => <BookItem key={book.bookTitle} item={book}/>)}
            </div>
        );
    }
}

