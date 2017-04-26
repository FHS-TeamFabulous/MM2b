import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import thunkMiddleware from 'redux-thunk';
import reducers, { rootEpic } from 'app/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

import addSocketListener from './services/socket';

export default (preloadedState) => {
    const store =  createStore(
        reducers,
        preloadedState,
        composeWithDevTools(
            applyMiddleware(thunkMiddleware, createEpicMiddleware(rootEpic))
        )
    );

    addSocketListener(store.dispatch, store.getState);

    return store;
};
