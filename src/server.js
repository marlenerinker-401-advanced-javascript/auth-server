'use strict';
//Module that sets up the server.

/**
 * Simple Server
 * @module server
 */
const express = require('express');

const authRouter = require('./auth/router.js');
const testAuth = require('./auth/extra-routes.js');

const app = express();
app.use(express.json());

app.use('/', authRouter);
app.use('/', testAuth);




module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log('server is up :::' + port);
    });
  }
}