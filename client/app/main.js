import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';
import MainLayout from 'app/components/main-layout';
import HelloWorldComponent from 'app/components/hello-world';
import BookReaderComponent from 'app/components/book-reader';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from 'app/reducers';

// move to app component
import turn from 'app/vendors/turn';

const store = createStore(reducers);

ReactDOM.render(
    <Provider store={ store }>
        <Router>
            <MainLayout>
                <Route exact path="/" component={ BookReaderComponent }/>
            </MainLayout>
        </Router>
    </Provider>,
    document.getElementById('main')
);

io.connect();
