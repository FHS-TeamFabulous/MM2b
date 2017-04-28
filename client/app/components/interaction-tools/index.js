import React from 'react';
import { connect } from 'react-redux';
import style from './style.scss';
import FaHandPointerO from 'react-icons/lib/fa/hand-pointer-o';
import PointerTool from './pointer-tool';
import { stopPointer, startPointer } from 'app/actions/tools-actions';

class InteractionTools extends React.Component {
    componentWillMount() {
        this.listener = null;
    }

    render() {
        return (
            <div>
                <div className={style.container}>
                    <button onClick={this.togglePointer.bind(this)} className={style.tool}>
                        <FaHandPointerO />
                    </button>
                </div>
                { 
                    this.props.pointer.isOn && 
                    <PointerTool 
                        hideMouse={this.props.pointer.hideMouse} 
                        pos={this.props.pointer.position} 
                    /> 
                }
            </div>
        );
    }

    togglePointer() {
        if (this.props.pointer.isOn) {
            this.props.dispatch(stopPointer(this.listener));
        } else {
            this.listener = this.props.dispatch(startPointer());
        }
    }
}

function mapStateToProps(state) {
    return {
        pointer: {
            isOn: state.toolsState.pointer.isOn,
            position: state.toolsState.pointer.position,
            hideMouse: state.toolsState.pointer.localControl
        }
    };
}

export default connect(mapStateToProps)(InteractionTools)
