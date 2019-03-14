// requirements
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const apiRouter = require('./routers/api_router.js');

// app.use
app.use(bodyParser.json());

app.use('/api', apiRouter);

app.all('/*', (req, res, next) => {
  res.status(404).send({ msg: 'Route not found' });
});

// put these into a new file called error handling
// app.use(handle400)
app.use((err, req, res, next) => {
  if (err.code === '23503') res.status(400).send({ msg: 'Bad Request' });
  if (err.code === '22P02') res.status(400).send({ msg: 'Invalid Article ID' });
  if (err.code === '22003') res.status(404).send({ msg: 'Article Not Found' });
  else next(err);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: 'Internal Server Error' });
});
module.exports = app;
