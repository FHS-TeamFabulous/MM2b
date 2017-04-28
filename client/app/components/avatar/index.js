import React from 'react';
import style from './style.scss';

import { connect }  from 'react-redux';

class Avatar extends React.Component {
    render() {
        return (
            <div>
                {this.displayContent()}
            </div>
        );
    }
    
    displayContent() {
        if (!this.props.selectedItemValue.id) {
            return (<h4>Bitte wählen Sie einen User aus!</h4>);
        } else {
            let loader = '';

            if (this.props.isLoading) {
                loader = (
                    <div className={style.avatarLoader}>
                        <div />
                        <div />
                        <div />
                    </div>
                );
            }

            return (
                <div className={style.avatarWrapper}>
                    <div className={style.avatarInner}>
                        <img className={style.avatarImage} src={this.props.url} />
                        <p className={style.avatarName}>{this.props.name}</p>
                        { loader }
                    </div>
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        selectedItemValue: state.modalState.selectedItem
    }
}

//<h2>{this.props.selectedItemValue}</h2>
export default connect(mapStateToProps)(Avatar);

