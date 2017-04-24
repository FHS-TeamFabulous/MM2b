/**
 * Created by Maxi on 24.04.17.
 */

import React from 'react';
import style from './style.scss';
import BookItem from './../book-item-in-collection';

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


