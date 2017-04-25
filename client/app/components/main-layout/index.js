import React from 'react';
import VideoComponent from '../client/video';

export default function MainLayout (props) {
    return (
        <div>
            { props.children }
            <VideoComponent name="christoph"/>
            <VideoComponent name="erfan"/>
        </div>
    );
}
