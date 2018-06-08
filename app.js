var createError = require('http-errors');
var express = require('express');
var path = require('path');
var partials = require ('express-partials');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('express-flash');
var logger = require('morgan');
var helmet = require('helmet');

var router = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	secret:'silcam',
	resave: true,
    saveUninitialized: true
    }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(partials());
app.use(flash());


// Helpers dinamicos:
app.use(function(req, res, next) {

  // si no existe lo inicializa
  if (!req.session.redir) {
    req.session.redir = '/';
  }
  
  // Hacer visible req.session en las vistas
  res.locals.session = req.session;
  next();
});


app.use('/', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('notFound');
});

// error handler
/**
app.use(function(err, req, res, next) {
  res.render('error');
});
*/
module.exports = app;
