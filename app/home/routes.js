var express = require('express');

function index (req, res) {
  res.render('home/index');
};

function setup (app, router) {
  app.set('views', 'app'); 
  app.set('view engine', 'html');
  app.engine('html', require('hogan-express'));
  app.use(express.static('public'));

  router.get('/', index);
};

module.exports = setup;