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
        templateUrl: 'templates/home/splash.html'
      });
  });
