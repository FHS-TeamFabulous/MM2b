import React from 'react';
import { render} from 'react-dom';
import { App } from './components/app/app';


const root = document.getElementById('main');
render(<App />, root);

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./components/app/app.js', () => {
        render(App, root);
    });
}




