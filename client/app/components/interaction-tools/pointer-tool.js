import React from 'react';
import style from './style.scss';
import FaHandPointerO from 'react-icons/lib/fa/hand-pointer-o';

export default class PointerTool extends React.Component {
    render() {
        let { x, y } = this.props.pos;
        let positionStyle = {
            transform: `translate(${x}px, ${y}px)`
        };

        return (
            <div className={ style.pointer } style={positionStyle}>
                <FaHandPointerO />
            </div>
        );
    }
}
