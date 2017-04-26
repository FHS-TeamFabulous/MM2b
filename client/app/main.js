import React from 'react';
import ReactDOM from 'react-dom';

import MainLayout from 'app/components/main-layout';
import ReaderLayout from 'app/components/reader-layout';
import Library from './components/bibliothek';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './components/app';
import configureStore from 'app/configure-store';
import 'rxjs';
import Header from 'app/components/header';

const header = <Header/>;

const store = configureStore();
const root = document.getElementById('main');

ReactDOM.render(
    <Provider store={ store }>
        <App>
            <Router>
                <MainLayout header={ header }>
                    <Route exact path="/" component={ Library }/>
                    <Route path="/playground" component={ReaderLayout}/>
                </MainLayout>
            </Router>
        </App>
    </Provider>,
    root
);

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./components/main-layout', () => {
        render(<MainLayout/>, root);
    });
}





