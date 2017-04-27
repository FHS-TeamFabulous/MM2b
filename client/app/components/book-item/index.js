import React from 'react';
import style from './style.scss';
import CustomButton from './../button';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import BookIcon from 'react-icons/lib/fa/book';
import GroupIcon from 'react-icons/lib/fa/group';
import config from 'config';
=======
import {openModal} from './../../actions/modal-actions'
import { connect } from 'react-redux';
>>>>>>> e1c6a7862b070bbccaeaad1de5e9f886e1ab7ba5


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
<<<<<<< HEAD
                            <Link to={`/books/${this.props.item.id}`}>
                                <CustomButton className={"defaultBtn"}>
                                    <BookIcon />
                                    Lesen
                                </CustomButton>
                            </Link>
                        </div>
                        <div className={style.buttonWrapper}>
                            <Link to={`/books/${this.props.item.id}`}>
                                <CustomButton className={"defaultBtn"}>
                                    <GroupIcon />
                                    Vorlesen
                                </CustomButton>
                            </Link>
=======
                            <Link to="/playground"><CustomButton type={"buttonBookItem"} content={"Lesen"}/></Link>
                        </div>
                        <div>
                            <CustomButton clickHandler={this.openModal.bind(this)} type={"buttonBookItem"} content={"Vorlesen"}/>
>>>>>>> e1c6a7862b070bbccaeaad1de5e9f886e1ab7ba5
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    openModal() {
        this.props.dispatch(openModal());
    }
}

export default connect()(BookItem);

