import { combineEpics } from 'redux-observable';
/*
import { offerEpic } from '../actions/signaling.actions';
*/
import { types } from '../actions/signaling.actions';

const initialState = {
    id: undefined,
    constraints: {
        video: true,
        audio: false
    },
    clients: [],
    connected: false
};

export const signalingReducer = (state = initialState, action) => {
    switch(action.type) {
        default:
            return state;
    }
};

export const signalingEpics = combineEpics(
   /* offerEpic*/
);


