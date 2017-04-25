import React from 'react';
import style from './style.scss';
import {Button} from 'react-bootstrap';


export default class CustomButton extends React.Component {
    render() {
        return (
            <div>
                <Button className={style[this.props.properties.className]}>{this.props.properties.icon}{this.props.properties.text}</Button>
            </div>
        );
    }
}
