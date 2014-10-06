var User = require('app/user/UserModel');

function login (req, res) {
}

function register (req, res) {
  res.json({message: 'successfully registered'});
};

function session (req, res) {
  res.json({ some: true, another: 'cool'});
};

function setup (router, passport) {
  router.get('/auth', session);
  router.post('/register', passport.authenticate('register'), register);
};

module.exports = setup;
