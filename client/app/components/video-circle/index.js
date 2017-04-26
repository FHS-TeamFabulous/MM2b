import React from 'react';
import style from './style.scss';

export default class VideoCircle extends React.Component {
    render() {
        return (
            <div className={style.video}>
                <video id={this.props.type} autoPlay src={this.props.src}/>
            </div>
        );
    }
}
