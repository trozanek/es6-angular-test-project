'use strict';

const express = require('express');
const mongoAdapter = require('./db/mongo');
const os = require('os');
// Constants
const PORT = 8080;

// App
const app = express();
app.get('/', function (req, res) {
  res.send('Hello world\n');
});

app.listen(PORT);

mongoAdapter.InitDB().then(function() {})
console.log(`Running on http:// ${os.hostname()} : ${os.port}`);
