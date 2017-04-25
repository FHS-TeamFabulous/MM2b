import React from 'react';
import VideoComponent from '../client/video';
import {Grid} from 'react-bootstrap';
import style from './style.scss';

export default function MainLayout (props) {
    return (
        <div>
            <Grid>
                <div className={ style.head }>
                    { props.header }
                </div>
            </Grid>
            <Grid className={style.content}>
                {props.children}
            </Grid>
            <VideoComponent name="christoph"/>
            <VideoComponent name="erfan"/>
        </div>
    );
}
