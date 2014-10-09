angular.module('bensethApp')
  .service('UserService', function () {

    var loggedIn = false;
    var currentUser = null;

    return {
      isLoggedIn: function () {
        return loggedIn;
      },
      setCurrentUser: function (user) {
        currentUser = user;
      },
      getCurrentUser: function () {
        return currentUser;
      }
    }
  });