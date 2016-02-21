'use strict';

const express = require('express');
const mongoAdapter = require('./db/mongo');
const os = require('os');
const bodyParser = require('body-parser');

const PORT = 8080;

// App
const app = express();
const router = require('./router');
const errorHandler = require('./middlewares/errorHandler');

app.use(bodyParser.json());
app.use('/', router);
app.use(errorHandler);
app.listen(PORT);

mongoAdapter.InitDB().then(function() {})
console.log(`Running on http:// ${os.hostname()} : ${os.port}`);
