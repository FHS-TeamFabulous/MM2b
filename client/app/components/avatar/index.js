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
            //<div><img src="/assets/images/1.jpg"/><p>{this.props.clients.name}</p></div>
            return <h2>{this.props.selectedItemValue}</h2>
        }
    }
}

function mapStateToProps(state) {

    return {
        selectedItemValue: state.modalState.selectedItem
    }
}

export default connect(mapStateToProps)(Avatar);

