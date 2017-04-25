'use strict';

const path = require('path');
const config = require('config');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const socket = require('./socket');

const rootPath = path.join(__dirname, config.get('http.rootPath'));

app.use(express.static(rootPath)); // set the root path to our client folder

http.listen(process.env.PORT || config.get('http.port'));

socket(http);

console.log('Server listening on port: ', process.env.PORT || config.get('http.port'));
