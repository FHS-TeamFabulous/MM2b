import React from 'react';
import ReactDOM from 'react-dom';
import MainLayout from './components/main-layout';
import ReaderLayout from './components/reader-layout';
//import HelloWorldComponent from './components/hello-world';
import Header from './components/header';
import Library from './components/bibliothek';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

const store = createStore(reducers);
const header = <Header/>;

const root = document.getElementById('main');


navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

ReactDOM.render(
    <Provider store={ store }>
        <Router>
            <MainLayout header={ header }>
                <Route exact path="/" component={ Library }/>
                <Route path="/playground" component={ReaderLayout}/>
            </MainLayout>
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




