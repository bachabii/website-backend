var express = require('express');
var app = express();
var api = require('./api/api');
var err = require('./middleware/err');
var config = require('./config/config');

// db.url is different depending on NODE_ENV
require('mongoose').connect(config.db.url);

// setup the app middleware
require('./middleware/appMiddleware')(app);

// setup the api
app.use('/api', api);

// setup global error handling
app.use(err());

// export the app for testing
module.exports = app;
