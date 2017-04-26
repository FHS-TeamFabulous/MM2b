import React from 'react';
import style from './style.scss';
import {Button} from 'react-bootstrap';


export default class CustomButton extends React.Component {
    render() {
        return (
            <div>
                <Button onClick={this.props.clickHandler} className={style[this.props.type]}>{this.props.content}</Button>
            </div>
        );
    }
}
