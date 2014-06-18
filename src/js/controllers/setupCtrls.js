var sprintf = require('sprintf').sprintf

var controllers = angular.module('setupControllers', [])

controllers.controller('SetupCtrl',   
  function($scope, $location) {
    $scope.setup = function() {
      $location.path('/setup/key')
    }
  }
)

controllers.controller('SetupKeyCtrl',   
  function($scope, $rootScope, $location, flash, Keyring) {
    $scope.minPassphraseSize = 8
    $scope.maxPassphraseSize = 255
    $scope.minKeySize = 1024
    $scope.maxKeySize = 4096
    $scope.generate = function(isValid) {
      if(isValid) {
        var userId = sprintf('%s <%s>', $scope.name, $scope.email)
        Keyring.createKeyPair($scope.passPhrase, userId, $scope.keySize)
        .then(Keyring.store)
        .then(function() {
          flash.success = 'Key generated'
          $location.path('/keyring')
        })
      }
    }
  }
)
