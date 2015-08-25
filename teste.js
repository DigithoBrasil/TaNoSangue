var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen(3000, function () {
  var port = process.env.port || 3000;

  console.log('Aberto na porta %s', port);
});
