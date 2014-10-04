#!/usr/bin/env node

var express  = require('express');
var logger   = require('morgan');
var path     = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


var app      = express();
var router   = express.Router();

mongoose.connect(require('app/config.js').db.url);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.set('views', __dirname); 
app.set('view engine', 'jade');

[
  'app/home/routes',
  'app/auth/routes'
].forEach(function (routePath) {
  require(routePath)(router);
});

app.use('/', router);

module.exports = app;
