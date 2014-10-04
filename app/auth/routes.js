var User = require('app/user/UserModel');
var passport = require('passport');
require('app/auth/passport')(passport);

function login (req, res) {
}

function register (req, res) {
  var post = req.body;
  User.findOne({'username': post.username}, function (err, user) {
    if (err) res.json({error: err});
    if (user) {
      res.json({error: 'username already taken'});
    } else {
      var user = new User();
      user.username = post.username;
      user.password = user.generateHash(post.password);
      user.lastname = post.lastname;
      user.firstname = post.firstname;
      user.save(function (err, user) {
        if (err) {
          res.json({error: err});
        } else {
          passport.authenticate('login')(req, res, function () {
            res.json(req.user);
          });
        }
      });
    }
  });
};

function session (req, res) {
  res.json({ some: true, another: 'cool'});
};

function init (router) {
  router.get('/auth', session);
  router.post('/register', register);
};

module.exports = init;
