import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import thunkMiddleware from 'redux-thunk';
import reducers, { rootEpic } from 'app/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';


export default (preloadedState) => {
    return createStore(
        reducers,
        preloadedState,
        composeWithDevTools(
            applyMiddleware(thunkMiddleware, createEpicMiddleware(rootEpic))
        )
    );
};
