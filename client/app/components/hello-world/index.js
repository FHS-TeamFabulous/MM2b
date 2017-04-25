import React from 'react';
import style from './style.scss'

export default class HelloWorldComponent extends React.Component {
    render() {
        return (
            <div className={style.content}>
                <h1>Hello World</h1>
            </div>
        );
    }
}

