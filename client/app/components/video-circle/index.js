import React from 'react';
import style from './style.scss';

export default class VideoCircle extends React.Component {
    render() {
        return (
            <div className={style.video} id={this.props.type + '_container'}>
            </div>
        );
    }
}
