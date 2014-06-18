var controllers = angular.module('baseControllers', [])

controllers.controller('BaseCtrl',
  function($scope, $location, Keystore) {
    Keystore.checkConfig()
    .then(function() {
      $scope.$apply(function() {
        $location.path('/keyring')
      })
    })
    .fail(function(error) {
      $scope.$apply(function() {
        $location.path('/setup')
      })
    })
  }
)
