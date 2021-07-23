const express = require("express");
const accountsRouter = require('./accounts/accounts-router')
const { logger, errorHandling, notFound } = require('./accounts/accounts-middleware')
const server = express();


server.use(express.json());
server.use(logger)
server.use('/api/accounts', accountsRouter)
server.use('*', notFound)
server.use(errorHandling)
module.exports = server;
