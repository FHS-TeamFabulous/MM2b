import React from 'react';
import style from './style.scss';
import CustomButton from './../button';
import { Link } from 'react-router-dom';


export default class BookItem extends React.Component {
    render() {
        return (
            <div className={style.bookItem}>
                <div className={style.itemWrapper}>
                    <img className={style.bookItemCover} alt={this.props.item.bookTitle} src="/assets/images/Foxy-Joxy-plays-a-trick_bookdash_01.jpg"/>
                    <div className={style.buttonGroupWrapper}>
                        <div className={style.buttonWrapper}>
                            <Link to="/playground" ><CustomButton properties={{className:"buttonBookItem", text:"Lesen"}}/></Link>
                        </div>
                        <div>
                            <Link to="/playground" ><CustomButton properties={{className:"buttonBookItem", text:"Vorlesen"}}/></Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
