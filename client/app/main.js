import React from 'react';
import ReactDOM from 'react-dom';
import MainLayout from './components/main-layout';
import HelloWorldComponent from './components/hello-world';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

const store = createStore(reducers);

ReactDOM.render(
    <Provider store={ store }>
        <Router>
            <MainLayout>
                <Route exact path="/" component={ HelloWorldComponent }/>
            </MainLayout>
        </Router>
    </Provider>,
    document.getElementById('main')
);

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./components/app/app.js', () => {
        render(App, root);
    });
}




