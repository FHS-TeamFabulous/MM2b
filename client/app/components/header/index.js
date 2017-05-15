import React from 'react';
import style from './style.scss';

export default function MainLayout (props) {
    return (
        <header className={style.header}>
            <div className={style.logo}>
                <img alt='Vorlesen Verbindet' src='/images/logo.jpg'/>
            </div>
        </header>
    );
}
