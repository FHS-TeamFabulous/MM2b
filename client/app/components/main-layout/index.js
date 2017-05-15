import React from 'react';
import { Grid } from 'react-bootstrap';
import Header from 'app/components/header';

export default function MainLayout (props) {
    return (
        <div>
            <Grid>
                <Header/>
                {props.children}
            </Grid>
        </div>
    );
}
