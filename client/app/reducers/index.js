import { combineReducers } from 'redux';
import helloWorldReducer from './hello-world-reducer';

export default combineReducers({
    helloWorldState: helloWorldReducer
});
