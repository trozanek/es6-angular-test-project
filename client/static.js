'use strict';

const express = require('express');

// Constants
const PORT = 80;

// App
const app = express();
app.use(express.static('app'));

app.listen(PORT);
console.log(process.env);
console.log('Running on http://localhost:' + PORT);
