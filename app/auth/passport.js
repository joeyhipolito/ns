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

  passport.use('register', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, username, password, done) {
    User.findOne({'username': username}, function (err, user) {
      if (err) return done(err);
      if (user) {
        return done(null, false);
      } else {
        var newUser = new User();
        newUser.username = username;
        newUser.password = newUser.generateHash(password);
        newUser.lastname = req.body.lastname;
        newUser.firstname = req.body.firstname;
        newUser.save(function (err, user) {
          if (err) throw err;
          return done(null, newUser);
        });
      }
    });
  }
  
  ));
};
