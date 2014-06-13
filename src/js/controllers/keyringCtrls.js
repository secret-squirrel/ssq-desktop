var controllers = angular.module('controllers', [])

controllers.controller('KeyringCtrl', ['$scope', '$rootScope', '$location', 'Keyring',
  function($scope, $rootScope, $location, Keyring) {
    if(Keyring.instance.isLocked()) {
      $rootScope.redirectTo = $location.path()
      $location.path('/keyring/unlock')
    } else {
      setDefaultKey()
    }

    $scope.generateKey = function() {
      Keyring.instance.createKeyPair('password', 1024)
      Keyring.instance.store()
      setDefaultKey()
    }

    function setDefaultKey() {
      var defaultKey = Keyring.instance.defaultKey()
      $scope.defaultKey = {
        fingerprint: defaultKey.primaryKey.getFingerprint(),
        userIds: defaultKey.getUserIds(),
        armor: defaultKey.toPublic().armor()
      }
    }
  }
])

controllers.controller('KeyringUnlockCtrl', ['$scope', '$location', 'Keyring',
  function($scope, $location, Keyring) {
    $scope.unlock = function() {
      Keyring.instance.load($scope.passPhrase)
      .then(function() {
        $scope.$apply(function() {
          if($scope.redirectTo) {
            $location.path($scope.redirectTo)
          } else {
            $location.path('/')
          }
        })
      })
      .catch(function(error) {
        $scope.$apply(function() {
          $scope.error = error
        })
      })
    }
  }
])

