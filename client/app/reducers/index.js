import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { signalingReducer, signalingEpics } from './signaling.reducer';
import booksReducer from './books-reducer';
import modalReducer from './modal-reducer';
import authReducer from './auth-reducer';
import helloWorldReducer from './hello-world-reducer';

export default combineReducers({
    helloWorldState: helloWorldReducer,
    signaling: signalingReducer,
    booksState: booksReducer,
    modalState: modalReducer,
    authState: authReducer
});

export const rootEpic = combineEpics(
    signalingEpics
);
