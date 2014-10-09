angular
  .module('bensethApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'http-auth-interceptor'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    // authentication || index page
    $stateProvider
      .state('home', {
        abstract: true,
        templateUrl: 'templates/fullwidth.html'
      })
      .state('home.splash', {
        url: '/',
        templateUrl: 'templates/home/splash.html',
        controller: 'AuthCtrl'
      });
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'templates/admin/index.html',
        controller: 'AuthCtrl'
      });
  })
  .run(function ($location, UserService, Auth) {
    var currentUser = UserService.getCurrentUser();
    if (!currentUser && (['/', '/login', '/logout', '/register'].indexOf($location.path()) === -1)) {
      Auth.get(function (user) {
        UserService.setCurrentUser(user);
      });
    }
  })
