var User = require('app/user/UserModel');
var passport = require('passport');
require('app/auth/passport')(passport);

function login (req, res) {
  res.json(req.user);
};

function register (req, res) {
  res.json({message: 'successfully registered'});
};

function session (req, res) {
  res.json(req.user);
};

function logout (req, res) {
  res.clearCookie('user');
  req.logout();
};

function setup (app, router) {
  app.use(passport.initialize());
  app.use(passport.session());
  
  router.get('/auth', session);
  router.post('/auth', passport.authenticate('login'), login);
  router.delete('/auth', logout);
  router.post('/register', passport.authenticate('register'), register);
};

module.exports = setup;
