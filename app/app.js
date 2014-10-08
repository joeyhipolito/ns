#!/usr/bin/env node

var express  = require('express');
var logger   = require('morgan');
var mongoose = require('mongoose');
var session  = require('express-session');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var errorhandler = require('errorhandler');

var app      = express();
var passport = require('passport');
require('app/auth/passport')(passport);
var router   = express.Router();

mongoose.connect(require('app/config.js').db.url);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.set('views', __dirname); 
app.set('view engine', 'jade');
app.use(express.static(__dirname, '/public'));

app.use(session({
  secret: 'karakasmongubodngsama',
  saveUninitialized: true,
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
if(process.env.NODE_ENV === 'development') {
  app.use(errorhandler());
}

module.exports = app;
