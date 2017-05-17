import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import style from './style.scss';
import * as pointerActions from 'app/actions/pointer';

class Pointer extends React.Component {
    componentWillUnmount() {
        if (this.stopMoveListener) {
            this.stopMoveListener();
        }
    }

    togglePointer(event) {
        if (this.props.pointerState.localOn) {
            this.deactivatePointer();
        } else {
            this.activatePointer(event);
        }
    }

    activatePointer(event) {
        this.stopMoveListener = this.props.dispatch(pointerActions.startPointer(
            event.pageX,
            event.pageY,
            this.setLocalPointerPosition.bind(this)
        ));
    }

    deactivatePointer() {
        this.stopMoveListener();
        this.props.dispatch(pointerActions.stopPointer());
    }

    setLocalPointerPosition(x, y) {
        const pointerEl = this.refs.localPointer;

        pointerEl.style.left = `${x}px`;
        pointerEl.style.top = `${y}px`;
    }

    render() {
        const remoteStyle = {
            left: this.props.remotePointer.position.x,
            top: this.props.remotePointer.position.y
        };

        const pointerBtnClasses = [
            style.pointerBtn
        ];

        if (this.props.pointerState.localOn) {
            pointerBtnClasses.push(style.isActive);
        }

        return (
            <div className={style.container}>
                <Button className={pointerBtnClasses.join(' ')} onClick={this.togglePointer.bind(this)}>
                    <img src='/images/pointer.png'/>
                </Button>

                {   this.props.pointerState.localOn &&
                    <div ref='localPointer' className={style.pointer}>
                        <img src='/images/pointer.png'/>
                        <div className={style.name}>
                            {this.props.auth.user.name}
                        </div>
                    </div>
                }

                {
                    this.props.pointerState.remoteOn &&
                    <div style={remoteStyle} className={style.remotePointer}>
                        <img src='/images/pointer.png'/>
                        <div className={style.name}>
                            {this.props.opponentReader.name}
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default connect((state) => ({
    auth: state.auth,
    pointerState: state.pointer.state,
    remotePointer: state.pointer.remote,
    opponentReader: (state.invitation.accepted || {}).opponent
}))(Pointer);
