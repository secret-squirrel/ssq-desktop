var config = require('./js/config')
var keystore = require('./js/lib/keystore')(config)
var ssq = require('ssq')
var Keyring = ssq.Keyring(keystore)

var controllers = angular.module('controllers', [])

controllers.controller('KeyringController', ['$scope', 
  function($scope) {
    Keyring.load('password')
      .then(function() {
        $scope.$apply(function() {
          var defaultKey = Keyring.defaultKey()
          $scope.defaultKey = {
            fingerprint: defaultKey.primaryKey.getFingerprint(),
            userIds: defaultKey.getUserIds(),
            armor: defaultKey.armor()
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
