import React from 'react';
import ReactDOM from 'react-dom';
import MainLayout from 'app/components/main-layout';
import Reader from 'app/components/reader';
import Home from 'app/components/home';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './components/app';
import configureStore from 'app/configure-store';
import 'rxjs';

const store = configureStore();
const root = document.getElementById('main');

ReactDOM.render(
  <Provider store={store}>
    <App>
      <Router>
        <MainLayout>
          <Route
            path="/"
            render={({ history }) =>
              <Home history={history} />
                        }
          />
          <Route
            path="/books/:id"
            render={({ history }) =>
              <Reader history={history} />
                        }
          />
        </MainLayout>
      </Router>
    </App>
  </Provider>,
    root
);

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./components/main-layout', () => {
        render(<MainLayout />, root);
    });
}

