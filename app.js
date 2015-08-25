var express = require('express');
var session = require('express-session')
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('./models/Doador.js');

var app = express();

app.use(session({
  secret: 'qualquerCoisa',
  resave: false,
  saveUninitialized: true
}));

if (app.get('env') == 'development')
  mongoose.connect('mongodb://localhost/blood');
else
  mongoose.connect('mongodb://tanosangue:123456@ds040948.mongolab.com:40948/TaNoSangueMongo');

var routes = require('./routes/index');
var doadorRotas = require('./routes/doador');
var doacoesRotas = require('./routes/doacoes');
var rankingRotas = require('./routes/ranking');
var estoqueRotas = require('./routes/estoque');

app.set('view engine', 'ejs');
app.use('/public', express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/Doador', doadorRotas);
app.use('/Doacoes', doacoesRotas);
app.use('/Ranking', rankingRotas);
app.use('/Estoque', estoqueRotas);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);
  res.render('error', {

    message: err.message,
    error: {}
  });
});


module.exports = app;

var server = app.listen(3000, function() {
  var port = process.env.port || 3000;

  console.log('Rodando na porta %s', port);
});