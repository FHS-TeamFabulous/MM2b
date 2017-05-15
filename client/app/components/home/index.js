import React from 'react';
import { connect } from 'react-redux';
import style from './style.scss';
import * as booksOverviewActions from 'app/actions/books-overview';
import * as readerActions from 'app/actions/reader';
import BookItem from 'app/components/book-item';
import LoginModal from 'app/components/login-modal';
import InviteModal from 'app/components/invite-modal';
import InviteReceivedModal from 'app/components/invite-received-modal';
import ReaderLeaveModal from 'app/components/reader-leave-modal';
import { Redirect } from 'react-router-dom';

class Home extends React.Component {
    constructor() {
        super();

        this.state = {
            showInviteModal: false,
            selectedBookId: null
        };
    }

    componentDidMount() {
        this.props.dispatch(booksOverviewActions.fetchBooks());
    }

    render() {
        const readerBook = this.props.reader.book;

        return (
            <div className={style.content}>
                <h1 className='util-text-highlighted'>
                    Viele schöne Bücher, Märchen und Kindergeschichten zum Vorlesen
                </h1>
                <h3>Unsere Bücher</h3>
                <p>
                    Hier finden Sie unsere wachsendes Angebot an tollen Büchern, Märchen und Gute-Nacht
                    Kindergeschichten zum Vorlesen. Die Auswahl können Sie  durch die verschieden Filtermöglichkeiten
                    (rechts) einschränken. Kindern Bücher online vorlesen ist ganz einfach. Buch durch Klick auf das
                    Titelbild auswählen und los geht’s.
                </p>
                <h3>Bücher:</h3>
                {
                    Object.keys(this.props.books)
                        .map(id => this.props.books[id])
                        .map(book => (<BookItem 
                                        key={book.id} 
                                        item={book}
                                        onReadBook={this.openReader.bind(this)}
                                        onReadBookTogether={this.openInviteModal.bind(this)}
                                    />))
                }
                <LoginModal show={!this.props.auth.isLoggedIn}/>
                <InviteModal 
                    show={this.state.showInviteModal && !this.props.invitation.accepted} 
                    bookId={this.state.selectedBookId}
                    onReject={this.closeInviteModal.bind(this)}
                    onClose={this.closeInviteModal.bind(this)}
                />
                <InviteReceivedModal/>
                <ReaderLeaveModal/>
                {readerBook && <Redirect to={`/books/${readerBook.id}`} push/>}
            </div>
        );
    }

    openReader(bookId) {
        this.props.dispatch(readerActions.openReader(bookId));
    }

    openInviteModal(bookId) {
        this.setState(() => ({
            showInviteModal: true,
            selectedBookId: bookId
        }));
    }

    closeInviteModal() {
        this.setState(() => ({
            showInviteModal: false,
            selectedBookId: null
        }));
    }
}

export default connect((state) => {
    return {
        auth: state.auth,
        reader: state.reader,
        books: state.booksOverview.books,
        invitation: state.invitation
    };
})(Home);
