angular.module('bensethApp')
  .service('UserService', function ($cookieStore) {

    var loggedIn = false;
    var currentUser = null;

    var isLoggedIn = function () {
      return loggedIn;
    };

    var setCurrentUser = function (user) {
      currentUser = user;
    };

    var getCurrentUser = function () {
      return currentUser;
    };

    return {
      isLoggedIn: function () {
        return loggedIn;
      },
      setCurrentUser: setCurrentUser,
      getCurrentUser: getCurrentUser,
    }
  })