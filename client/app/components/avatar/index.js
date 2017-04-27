import React from 'react';
import style from './style.scss';

import { connect }  from 'react-redux';

class Avatar extends React.Component {

    getClientData() {
        const idx = this.props.clients.find(client => client.id === this.props.selectedItemValue);
        if (idx) {
            return this.props.clients[idx].name;
        }
    }

    render() {
        return (
            <div>
                {this.displayContent.bind(this)}
            </div>
        );
    }
    displayContent() {
        if(this.props.selectedItemValue === 0)
        {
            return <h4>Bitte wählen sie einen User aus!</h4>;
        }
        else {
            return <div className={style.avatarWrapper}><img className={style.avatarImage} src="/assets/images/oma.jpg"/><p className={style.avatarName}>{getClientData()}</p></div>
        }
    }
}

function mapStateToProps(state) {

    return {
        selectedItemValue: state.modalState.selectedItem,
        clients: state.communication.clients
    }
}

//<h2>{this.props.selectedItemValue}</h2>
export default connect(mapStateToProps)(Avatar);

