import React from 'react';
import style from './style.scss'

export default class HelloWorldComponent extends React.Component {
    render() {
        return (
            <div className={ style.main }>
                <h1>Hello World</h1>
            </div>
        );
    }
}

