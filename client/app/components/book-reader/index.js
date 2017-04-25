import React from 'react';
import BookReader from './view';
import { fetchBooks } from 'app/actions/books-actions';
import { connect } from 'react-redux';

// center inside a container
// next/prev buttons
// resize
// book styling
// keyboard control
// preload images -> model / store
class BookReaderContainer extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchBooks());
    }

    createPages() {

    }

    render() {
        return (
            <BookReader 
                ready={this.props.isDone}
                width={this.props.width} 
                height={this.props.height}
                pages={this.props.pages}
            />
        );
    }
}

function calcBookSize(pageWidth, pageHeight, windowWidth, windowHeight) {
    let bookWidth = pageWidth * 2;
    let bookHeight = pageHeight;
    let aspectRatio = bookWidth / bookHeight;
    let bookVerticalMargin = 200;
    let bookHorizontalMargin = 200;

    console.log('lel', pageWidth);

    if (bookHeight > (windowHeight - bookVerticalMargin)) {
        let overflow = bookHeight - (windowHeight - bookVerticalMargin);
        bookHeight = bookHeight - overflow;
        bookWidth = bookHeight * aspectRatio;
    }

    return { bookWidth, bookHeight };
}

function mapPropsToState(state) {
    const selectedBook = state.booksState.books[state.booksState.selectedBook];
    
    if (!selectedBook) return {};

    const { width: pageWidth, height: pageHeight } = selectedBook.dimensions;
    const { bookWidth, bookHeight } = calcBookSize(
        pageWidth, 
        pageHeight, 
        window.innerWidth, 
        window.innerHeight
    );

    return {
        isDone: state.booksState.isDone,
        width: bookWidth,
        height: bookHeight,
        pages: selectedBook.pages
    }
}

export default connect(mapPropsToState)(BookReaderContainer);
