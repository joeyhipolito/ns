var User = require('app/user/UserModel.js');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
  
  passport.use('login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, username, password, done) {
    User.findOne({'username': username}, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user || !user.validPassword(password)) {
        return done(null, false);
      }
      return done(null, user);
    });
  }));
};
