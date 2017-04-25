import React from 'react';
import style from './style.scss';
import {Nav, NavItem} from 'react-bootstrap';

export default class Header extends React.Component {
    render() {
        return (
            <div>
                <div className={style.logoWrapper}>
                    <img className={style.logo} alt="vorlesen-verbindet-logo" src="./../../../assets/images/vorlesen-verbindet_logo.jpg"/>
                </div>
                <div className={style.navBarWrapper}>
                    <Nav bsStyle="pills" >
                        <NavItem className={style.navItem} eventKey={1} href="#">Home</NavItem>
                        <NavItem className={style.navItem} eventKey={2} href="#">Bibliothek</NavItem>
                    </Nav>
                </div>
            </div>
        );
    }
}
