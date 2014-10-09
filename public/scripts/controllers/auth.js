angular.module('bensethApp')
  .controller('AuthCtrl', function ($scope, $state, Auth, UserService) {

    $scope.currentUser = UserService.getCurrentUser();

    $scope.login = function () {
      Auth.login($scope.user).$promise.then(function (user) {
        UserService.setCurrentUser(user);
        $state.go('admin');
      });
    };

    $scope.logout = function () {
      Auth.logout().$promise.then(function (re) {
        UserService.setCurrentUser(null);
      });
    };
    
  });