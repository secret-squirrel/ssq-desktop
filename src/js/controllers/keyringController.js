var controllers = angular.module('controllers', [])

controllers.controller('KeyringController', ['$scope', 'Keyring',
  function($scope, Keyring) {
    Keyring.load('password')
      .then(function() {
        $scope.$apply(function() {
          var defaultKey = Keyring.defaultKey()
          $scope.defaultKey = {
            fingerprint: defaultKey.primaryKey.getFingerprint(),
            userIds: defaultKey.getUserIds(),
            armor: defaultKey.toPublic().armor()
          }
        })
      })
      .catch(function(error) {
        console.log('Error:', error)
      })

    $scope.generateKey = function() {
      Keyring.createKeyPair('password', 1024)
      Keyring.store()
    }
  }
])
