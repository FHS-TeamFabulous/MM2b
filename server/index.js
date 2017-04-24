'use strict';

const path = require('path');
const config = require('config');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const socket = require('./socket'); 
const apiRoutes = require('./api-routes')(express.Router()); 

const clientPath = path.join(__dirname, config.get('paths.client'));
const assetsPath = path.join(__dirname, config.get('paths.assets'));

app.use(express.static(clientPath)); // set the root path to our client folder
app.use('/api/', apiRoutes);
app.use('/assets/', express.static(assetsPath));

http.listen(process.env.PORT || config.get('http.port'));

socket(http, config);

console.log('Server listening on port: ', process.env.PORT || config.get('http.port'));
