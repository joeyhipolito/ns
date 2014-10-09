// http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/
angular.module('bensethApp')
  .factory('Resource', function ($resource) {    
    return function (url, params, methods) {
      var defaults = {
        update: { method: 'put', isArray: false},
        create: { method: 'post'}
      };

      methods = angular.extend(defaults, methods);
      var resource = $resource(url, params, methods);

      resource.prototype.$save = function() {
        if (!this._id) {
          return this.$create();
        } else {
          return this.$update({id: this._id});
        }
      };

      return resource;
    };
  });