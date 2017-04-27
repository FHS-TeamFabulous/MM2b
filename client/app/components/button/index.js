import React from 'react';
import style from './style.scss';


export default class CustomButton extends React.Component {
    render() {
        return (
            <div className={style.container}>
                <button onClick={this.props.onClick} className={style[this.props.className]}>
                    {this.props.children}
                </button>
            </div>
        );
    }
}
