import React from 'react';
import style from './style.scss';
import { Nav, NavItem } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default class Header extends React.Component {
    render() {
        return (
            <div>
                <div className={style.logoWrapper}>
                    <img className={style.logo} alt="vorlesen-verbindet-logo" src="/assets/images/vorlesen-verbindet_logo.jpg"/>
                </div>
                <div className={style.navBarWrapper}>
                    <ul className="nav nav-pills">
                        <li>
                            <a target="_blank" href="http://vorlesen-verbindet.com">Home</a>
                        </li>
                        <li>
                            <NavLink to="/" activeClassName={style.navActive}>Bibliothek</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
