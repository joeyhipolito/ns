angular.module('bensethApp')
  .controller('AuthCtrl', function ($scope, $state, Auth, UserService) {

    $scope.currentUser = UserService.getCurrentUser();

    $scope.login = function () {
      Auth.save($scope.user).$promise.then(function (user) {
        UserService.setCurrentUser(user);
        $state.go('admin');
      })
    };

    $scope.logout = function () {
      Auth.delete().$promise.then(function (re) {
        UserService.setCurrentUser(null);
      });
    };
    
  });