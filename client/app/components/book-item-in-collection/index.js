import React from 'react';
import style from './style.scss';
import {Button} from 'react-bootstrap'

export default class BookItem extends React.Component {
    render() {
        return (
            <div className={style.bookItem}>
                <div className={style.itemWrapper}>
                    <img className={style.bookItemCover} src="./../../assets/images/Foxy-Joxy-plays-a-trick_bookdash_01.jpg"/>
                    <div className={style.buttonGroupWrapper}>
                        <div className={style.buttonWrapper}>
                            <Button className={style.buttonBookItem}  >Lesen</Button>
                        </div>
                        <div>
                            <Button className={style.buttonBookItem} >Vorlesen</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
