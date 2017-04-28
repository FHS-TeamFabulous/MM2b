import React from 'react';
import style from './style.scss';


export default class CustomButton extends React.Component {
    render() {
        //console.log(this.props.availability);
        return (
            <div className={style.container}>
                <button disabled={this.props.availability} onClick={this.props.onClick} className={style[this.props.className]}>
                    {this.props.children}
                </button>
            </div>
        );
    }
}
