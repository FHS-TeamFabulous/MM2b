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
    //{this.displayContent(this.props.selectedItemValue+1)}
    displayContent() {
        if(this.props.selectedItemValue === 0)
        {
            return <h4>Bitte wählen sie einen User aus!</h4>;
        }
        else {
            return <div className={style.avatarWrapper}><img className={style.avatarImage} src="/assets/images/oma.jpg"/><p className={style.avatarName}>{this.props.selectedItemValue} Oma 3rfan</p></div>
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

