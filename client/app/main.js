import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';
import { HelloWorldComponent } from 'components/hello-world';


ReactDOM.render(<HelloWorldComponent />, document.getElementById('main'));

io.connect();
