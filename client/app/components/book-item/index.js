import React from 'react';
import { Button } from 'react-bootstrap';
import BookIcon from 'react-icons/lib/fa/book';
import GroupIcon from 'react-icons/lib/fa/group';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import style from './style.scss';

export default class BookItem extends React.Component {
    render() {
        const { id, title } = this.props.item;
        const coverUrl = this.props.item.pages[0].url;

        return (
            <div className={style.container}>
                <div className={style.coverContainer}>
                    <img
                        className={style.cover}
                        alt={title}
                        src={`${coverUrl}`}
                    />
                </div>
                <div className={style.buttonGroupWrapper}>
                    <Button className='btn-block' onClick={() => this.props.onReadBook(id)}>
                        <BookIcon/>
                        Lesen
                    </Button>
                    <Button className='btn-block' onClick={() => this.props.onReadBookTogether(id)}>
                        <GroupIcon/>
                        Vorlesen
                    </Button>
                </div>
            </div>
        );
    }
}

BookItem.defaultProps = {
    onReadBook: () => {},
    onReadBookTogether: () => {}
};
