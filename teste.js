var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var porta = process.env.port || 3000;

var server = app.listen(porta, function () {
  console.log('Aberto na porta %s', porta);
});
