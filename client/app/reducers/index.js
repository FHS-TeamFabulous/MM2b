import { combineReducers } from 'redux';
import authReducer from './auth';
import booksOverviewReducer from './books-overview';
import readerReducer from './reader';
import invitationReducer from './invitation';
import pointerReducer from './pointer';

export default combineReducers({
    auth: authReducer,
    reader: readerReducer,
    booksOverview: booksOverviewReducer,
    invitation: invitationReducer,
    pointer: pointerReducer 
});
