import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { signalingReducer, signalingEpics } from './signaling.reducer';
import helloWorldReducer from './hello-world-reducer';

export default combineReducers({
    helloWorldState: helloWorldReducer,
    signaling: signalingReducer
});

export const rootEpic = combineEpics(
    signalingEpics
);
