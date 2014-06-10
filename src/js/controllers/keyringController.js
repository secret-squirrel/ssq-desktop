var controllers = angular.module('controllers', [])

controllers.controller('KeyringController', ['$scope', 
  function($scope) {
    $scope.test = 'Hello from KeyringController'
  }])
