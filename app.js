// requirements
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const apiRouter = require('./routers/api_router.js');
const { handle400s } = require('./errors/index');

// app.use
app.use(bodyParser.json());

app.use('/api', apiRouter);

app.all('/*', (req, res, next) => {
  res.status(404).send({ msg: 'Route not found' });
});

app.use('/*', handle400s);

app.use((err, req, res, next) => {
  res.status(500).send({ msg: 'Internal Server Error' });
});
module.exports = app;
