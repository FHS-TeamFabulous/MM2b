import React from 'react';
import style from './style.scss';
import BookItem from './../book-item';

export default class BookCollection extends React.Component {
    render() {
        return (
            <div>
                <BookItem/>
                <BookItem/>
            </div>
        );
    }
}


