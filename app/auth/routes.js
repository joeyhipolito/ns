var User = require('app/user/UserModel');

function login (req, res) {
  res.json(req.user);
};

function register (req, res) {
  res.json({message: 'successfully registered'});
};

function session (req, res) {
  res.json({ some: true, another: 'cool'});
};

function logout (req, res) {
  req.logout();
};

function setup (router, passport) {
  router.get('/auth', session);
  router.post('/auth', passport.authenticate('login'), login);
  router.delete('/auth', logout);
  router.post('/register', passport.authenticate('register'), register);
};

module.exports = setup;
