import React from 'react';
import BookReader from './view';
import { 
    fetchBooksIfNeeded, 
    pageNext, 
    pagePrev, 
    setPage, 
    selectBook 
} from 'app/actions/books-actions';
import { connect } from 'react-redux';
import style from './style.scss';
import AngleRightIcon from 'react-icons/lib/fa/angle-right';
import AngleLeftIcon from 'react-icons/lib/fa/angle-left';

// center inside a container
// next/prev buttons
// resize
// book styling
// keyboard control
// preload images -> model / store
class BookReaderContainer extends React.Component {
    componentWillMount() {
        const bookId = this.props.bookId;

        this.props.dispatch(fetchBooksIfNeeded())
            .then(() => this.props.dispatch(selectBook(bookId)));
    }

    render() {
        const containerStyle = {
            width: this.props.width
        };


        console.log(this.props.isDone);
        return (
            <div style={ containerStyle } className={ style.container }>
                {
                    (this.props.currentPage > 1) &&
                    <button onClick={this.pagePrevHandler.bind(this)} className={ style.btnPrev }>
                        <AngleLeftIcon />
                    </button>
                }
                <BookReader 
                    ready={this.props.isDone}
                    width={this.props.width} 
                    height={this.props.height}
                    pages={this.props.pages}
                    currentPage={this.props.currentPage}
                    setPage={this.setPageHandler.bind(this)}
                />
                {
                    (this.props.currentPage < this.props.pages.length - 1) &&
                    <button onClick={this.pageNextHandler.bind(this)} className={ style.btnNext }>
                        <AngleRightIcon />
                    </button>
                }
            </div>
        );
    }

    pageNextHandler() {
        this.props.dispatch(pageNext());
    }

    pagePrevHandler() {
        this.props.dispatch(pagePrev());
    }

    setPageHandler(page) {
        this.props.dispatch(setPage(page));
    }
}

BookReaderContainer.defaultProps = {
    pages: []
};

function calcBookSize(pageWidth, pageHeight, windowWidth, windowHeight) {
    let bookWidth = pageWidth * 2;
    let bookHeight = pageHeight;
    let aspectRatio = bookWidth / bookHeight;
    let bookVerticalMargin = 200;
    let bookHorizontalMargin = 200;

    if (bookHeight > (windowHeight - bookVerticalMargin)) {
        let overflow = bookHeight - (windowHeight - bookVerticalMargin);
        bookHeight = bookHeight - overflow;
        bookWidth = bookHeight * aspectRatio;
    } 

    if (bookWidth > (windowWidth - bookHorizontalMargin)) {
        let overflow = bookWidth - (windowWidth - bookHorizontalMargin);
        bookWidth = bookWidth - overflow;
        bookHeight = bookWidth / aspectRatio;   
    }

    return { bookWidth, bookHeight };
}

function mapPropsToState(state) {
    const selectedBook = state.booksState.books[state.booksState.selectedBookId];
    
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
        pages: selectedBook.pages,
        currentPage: state.booksState.selectedBookPage
    }
}

export default connect(mapPropsToState)(BookReaderContainer);
