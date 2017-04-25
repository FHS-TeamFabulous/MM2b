import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from 'app/reducers';

export default (preloadedState) => {
    return createStore(
        reducers,
        preloadedState,
        applyMiddleware(thunkMiddleware)
    );
};
