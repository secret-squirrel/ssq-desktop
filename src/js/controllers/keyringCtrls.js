var sprintf = require('sprintf').sprintf

var controllers = angular.module('keyringControllers', [])

controllers.controller('KeyringCtrl',   
  function($scope, $rootScope, $location, Keyring) {
    if(Keyring.isLocked()) {
      $rootScope.redirectTo = $location.path()
      $location.path('/keyring/unlock')
    } else {
      setDefaultKey()
    }

    function setDefaultKey() {
      var defaultKey = Keyring.defaultKey()
      $scope.defaultKey = {
        fingerprint: defaultKey.primaryKey.getFingerprint(),
        userIds: defaultKey.getUserIds(),
        armor: defaultKey.toPublic().armor()
      }
    }
  }
)

controllers.controller('KeyringUnlockCtrl', 
  function($scope, $location, flash, Keyring) {
    $scope.unlock = function() {
      Keyring.load($scope.passPhrase)
      .then(function() {
        $scope.$apply(function() {
          flash.success = 'Keyring unlocked'
          if($scope.redirectTo) {
            $location.path($scope.redirectTo)
          } else {
            $location.path('/')
          }
        })
      })
      .catch(function(error) {
        $scope.$apply(function() {
          flash.error = error
          $scope.error = error
        })
      })
    }
  }
)

controllers.controller('KeyringGenerateCtrl', 
  function($scope, $rootScope, $location, flash, Keyring) {
    if(Keyring.isLocked()) {
      $rootScope.redirectTo = $location.path()
      $location.path('/keyring/unlock')
    } else {
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
  }
)
