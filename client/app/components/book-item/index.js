import React from 'react';
import style from './style.scss';
import CustomButton from './../button';
import { Link } from 'react-router-dom';
import {openModal} from './../../actions/modal-actions'
import { connect } from 'react-redux';


class BookItem extends React.Component {
    render() {
        return (
            <div className={style.bookItem}>
                <div className={style.itemWrapper}>
                    <img className={style.bookItemCover} alt={this.props.item.bookTitle} src="/assets/images/Foxy-Joxy-plays-a-trick_bookdash_01.jpg"/>
                    <div className={style.buttonGroupWrapper}>
                        <div className={style.buttonWrapper}>
                            <Link to="/playground"><CustomButton type={"buttonBookItem"} content={"Lesen"}/></Link>
                        </div>
                        <div>
                            <CustomButton clickHandler={this.openModal.bind(this)} type={"buttonBookItem"} content={"Vorlesen"}/>
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

