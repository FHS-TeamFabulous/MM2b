import React from 'react';
import { Grid } from 'react-bootstrap';
import Header from 'app/components/header';
import VideoComponent from 'app/components/video/index';
import style from './style.scss';

export default function MainLayout (props) {
    return (
        <div>
            <Grid>
                <div className={ style.head }>
                    <Header />
                </div>
            </Grid>
            <Grid className={style.content}>
                {props.children}
            </Grid>
            <VideoComponent/>
        </div>
    );
}
