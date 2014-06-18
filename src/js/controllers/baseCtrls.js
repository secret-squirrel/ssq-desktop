var controllers = angular.module('baseControllers', [])

controllers.controller('BaseCtrl',
  function($scope, $location, Keystore) {
    Keystore.checkConfig()
    .then(function(result) {
      $scope.$apply(function() {
        if(result.error) {
          $location.path('/setup')
        } else {
          $location.path('/keyring')
        }
      })
    })
  }
)
