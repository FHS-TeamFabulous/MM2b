import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { communicationReducer, communicationEpics } from './communication-reducer';
import booksReducer from './books-reducer';
import modalReducer from './modal-reducer';
import authReducer from './auth-reducer';
import toolsReducer from './tools-reducer';
import helloWorldReducer from './hello-world-reducer';

export default combineReducers({
    helloWorldState: helloWorldReducer,
    communication: communicationReducer,
    booksState: booksReducer,
    modalState: modalReducer,
    authState: authReducer,
    toolsState: toolsReducer
});

export const rootEpic = combineEpics(
    communicationEpics
);
