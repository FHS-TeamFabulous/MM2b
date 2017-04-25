import React from 'react';
import ReactDOM from 'react-dom';
import MainLayout from './components/main-layout';
import HelloWorldComponent from './components/hello-world';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';
import App from './components/app';
import reducers, { rootEpic } from './reducers';

const epicMiddleware = createEpicMiddleware(rootEpic);

const store = createStore(
    reducers,
    composeWithDevTools(
        applyMiddleware(epicMiddleware)
    )
);

const root = document.getElementById('main');


navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

ReactDOM.render(
    <Provider store={ store }>
        <Router>
            <App>
                <MainLayout>
                    <Route exact path="/" component={ HelloWorldComponent }/>
                </MainLayout>
            </App>
        </Router>
    </Provider>,
    root
);

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./components/main-layout', () => {
        render(<MainLayout/>, root);
    });
}




