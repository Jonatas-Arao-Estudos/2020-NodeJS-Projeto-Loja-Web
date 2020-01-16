const express = require('express');

const Api = require('./routes/api');
const Web = require('./routes/web');

const routes = express.Router();

//API
routes.use('/api', Api);
routes.use(Web);

module.exports = routes;