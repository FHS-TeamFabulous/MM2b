import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';
import MainLayout from './components/main-layout';
//import HelloWorldComponent from './components/hello-world';
import Header from './components/header';
import BibliothekPage from './components/bibliothek';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

const store = createStore(reducers);
const header = <Header/>;

ReactDOM.render(
    <Provider store={ store }>
        <Router>
            <MainLayout header={ header }>
                <Route exact path="/" component={ BibliothekPage }/>
            </MainLayout>
        </Router>

    </Provider>,
    document.getElementById('main')
);

io.connect();
