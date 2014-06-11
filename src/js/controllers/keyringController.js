var config = require('./js/config')
var keystore = require('./js/lib/keystore')(config)
var ssq = require('ssq')
var Keyring = ssq.Keyring(keystore)

var controllers = angular.module('controllers', [])

controllers.controller('KeyringController', ['$scope', 
  function($scope) {
    Keyring.load('1234qwer')
      .then(function() {
        $scope.test = 'Hello from KeyringController'
        $scope.publicKeys = Keyring.publicKeys()
        $scope.defaultKey = Keyring.defaultKey()
      })
      .catch(function(error) {
        console.log('Error:', error)
      })
  }
])
