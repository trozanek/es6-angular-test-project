'use strict';

const express = require('express');
const mongoAdapter = require('./db/mongo');
const os = require('os');
const bodyParser = require('body-parser');

const PORT = 8080;

// App
const app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST")
  next();
});
const router = require('./router');
const errorHandler = require('./middlewares/errorHandler');

app.use(bodyParser.json());
app.use('/', router);
app.use(errorHandler);
app.listen(PORT);

mongoAdapter.InitDB().then(function() {})
console.log(`Running on http:// ${os.hostname()} : ${os.port}`);
