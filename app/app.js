#!/usr/bin/env node

var express  = require('express');
var logger   = require('morgan');
var path     = require('path');
var mongoose = require('mongoose');
var session  = require('express-session');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');

var app      = express();
var passport = require('passport');
var router   = express.Router();

mongoose.connect(require('app/config.js').db.url);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.set('views', __dirname); 
app.set('view engine', 'jade');

app.use(session({
  secret: 'karakasmongubodngsama',
  saveUninitialize: true,
  resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

[
  'app/home/routes',
  'app/auth/routes'
].forEach(function (routePath) {
  require(routePath)(router, passport);
});

app.use('/', router);

module.exports = app;
