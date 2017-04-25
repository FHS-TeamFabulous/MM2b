import { combineReducers } from 'redux';
import booksReducer from './books-reducer';
import helloWorldReducer from './hello-world-reducer';

export default combineReducers({
    booksState: booksReducer,
    helloWorldState: helloWorldReducer
});
