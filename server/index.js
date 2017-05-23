'use strict';

const path = require('path');
const config = require('config');
const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').Server(app);
const socket = require('./socket');
const apiRoutes = require('./api-routes')(express.Router());
const enforce = require('express-sslify');

const clientPath = path.join(__dirname, config.get('paths.client'));
const assetsPath = path.join(__dirname, config.get('paths.assets'));

// middleware
app.use(enforce.HTTPS({ trustProtoHeader: true }))
app.use(express.static(clientPath)); // set the root path to our client folder
app.use(cors());
app.use('/api/', apiRoutes);
app.use('/assets/', express.static(assetsPath));

app.get('/*', function(req, res) {
    res.sendFile(`${clientPath}/index.html`);
});

http.listen(process.env.PORT || config.get('http.port'));

socket(http);

console.log('Server listening on port: ', process.env.PORT || config.get('http.port'));
