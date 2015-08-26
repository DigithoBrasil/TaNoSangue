var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var porta = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000;
var host = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";

var server = app.listen(porta, host, function () {
  console.log('Aberto em %s:%s', host, porta);
});
