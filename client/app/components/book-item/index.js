import React from 'react';
import style from './style.scss';
import CustomButton from 'app/components/button';
import { Link } from 'react-router-dom';
import BookIcon from 'react-icons/lib/fa/book';
import GroupIcon from 'react-icons/lib/fa/group';
import config from 'config';

import {openLoginModal, openInviteModal} from './../../actions/modal-actions';
import { connect } from 'react-redux';
import {selectBook} from 'app/actions/books-actions';


class BookItem extends React.Component {
    render() {
        const coverUrl = this.props.item.pages[0].url;

        return (
            <div className={style.bookItem}>
                <div className={style.itemWrapper}>
                    <div className={style.coverContainer}>
                        <img
                            className={style.bookItemCover}
                            alt={this.props.item.title}
                            src={`${config.server.base}${coverUrl}`}
                        />
                    </div>
                    <div className={style.buttonGroupWrapper}>
                        <div className={style.buttonWrapper}>
                            <Link to={`/books/${this.props.item.id}`}>
                                <CustomButton className={"defaultBtn"} onClick={() => this.props.dispatch(selectBook(this.props.item.id))}>
                                    <BookIcon />
                                    Lesen
                                </CustomButton>
                            </Link>
                        </div>
                        <div className={style.buttonWrapper}>
                            <Link to={`/books/${this.props.item.id}`}>
                                <CustomButton onClick={this.openModal.bind(this)} className={"defaultBtn"} >
                                    <GroupIcon />
                                    Vorlesen
                                </CustomButton>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    /*openCloseModal(){
        this.props.dispatch(openCloseModal());
    }*/
    openModal() {
        this.props.dispatch(selectBook(this.props.item.id));
        switch (this.props.loggingStatus) {
            case false:
                return this.props.dispatch(openLoginModal());
            case true:
                return this.props.dispatch(openInviteModal());
        }
    }
}
function mapStateToProps(state) {
    return {
        loggingStatus: state.authState.isLoggedIn
    }
}

export default connect(mapStateToProps)(BookItem);

