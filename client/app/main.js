import React from 'react';
import ReactDOM from 'react-dom';

import MainLayout from 'app/components/main-layout';
import ReaderLayout from 'app/components/reader-layout';
//import HelloWorldComponent from './components/hello-world';
import BookReaderComponent from 'app/components/book-reader';

import Header from './components/header';
import Library from './components/bibliothek';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';
import App from './components/app';
import reducers, { rootEpic } from './reducers';
import configureStore from 'app/configure-store';

// move to app component
import turn from 'app/vendors/turn';

const store = configureStore();

const epicMiddleware = createEpicMiddleware(rootEpic);

const store = createStore(
    reducers,
    composeWithDevTools(
        applyMiddleware(epicMiddleware)
    )
);
const store = createStore(reducers);
const header = <Header/>;

const root = document.getElementById('main');


navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

ReactDOM.render(
    <Provider store={ store }>
        <Router>
            <App>
                <MainLayout header={ header }>
                    <Route exact path="/" component={ Library }/>
                    <Route path="/playground" component={ReaderLayout}/>
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




