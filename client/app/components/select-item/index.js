import React from 'react';
import style from './style.scss';

export default class SelectItem extends React.Component {
    render() {
        return (
            <div >
                <img className={style.image} src="/assets/images/oma.jpg"/><span>{this.props.username}</span>
            </div>
        );
    }
}
