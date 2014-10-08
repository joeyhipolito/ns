#!/usr/bin/env node

var express  = require('express');
var logger   = require('morgan');
var mongoose = require('mongoose');
var session  = require('express-session');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var errorhandler = require('errorhandler');

var app      = express();
var router   = express.Router();

mongoose.connect(require('app/config.js').db.url);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
  secret: 'karakasmongubodngsama',
  saveUninitialized: true,
  resave: true
}));

[
  'app/home/routes',
  'app/auth/routes'
].forEach(function (routePath) {
  require(routePath)(app, router);
});

app.use('/', router);
if(process.env.NODE_ENV === 'development') {
  app.use(errorhandler());
}

module.exports = app;