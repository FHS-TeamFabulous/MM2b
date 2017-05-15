import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from 'app/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

export default (preloadedState) => {
    const store = createStore(
        reducers,
        preloadedState,
        composeWithDevTools(
            applyMiddleware(thunkMiddleware)
        )
    );

    return store;
};
