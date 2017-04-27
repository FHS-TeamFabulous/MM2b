import React from 'react';
import style from './style.scss';
import BookCollection from 'app/components/book-collection';
import { connect }  from 'react-redux';
import { fetchBooksIfNeeded } from 'app/actions/books-actions';

class Library extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchBooksIfNeeded());
    }

    render() {
        return (
            <div className={style.content}>
                <h1 className={style.titleHeader}>Viele schöne Bücher, Märchen und Kindergeschichten zum Vorlesen</h1>
                <h3 className={style.paragraphHeader} >Unsere Bücher</h3>
                <p>Hier finden Sie unsere wachsendes Angebot an tollen Büchern, Märchen und Gute-Nacht
                    Kindergeschichten zum Vorlesen. Die Auswahl können Sie  durch die verschieden Filtermöglichkeiten
                    (rechts) einschränken. Kindern Bücher online vorlesen ist ganz einfach. Buch durch Klick auf das
                    Titelbild auswählen und los geht’s.
                </p>
                <BookCollection books={this.props.books}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        books: state.booksState.books
    };
}

export default connect(mapStateToProps)(Library);


