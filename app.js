var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('<html><body>Hello from Node.js!</body></html>');
});

app.listen(8080);
console.log('Running on http://localhost:8080');