angular.module('bensethApp')
  .factory('Auth', ['Resource', function ($resource) {
    return $resource('/auth');
  }]);