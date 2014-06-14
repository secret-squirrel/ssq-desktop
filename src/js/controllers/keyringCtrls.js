var controllers = angular.module('controllers', [])

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
          Keyring.createKeyPair($scope.passPhrase, $scope.keySize)
          Keyring.store()
          flash.success = 'Key generated'
          $location.path('/keyring')
        }
      }
    }
  }
)
