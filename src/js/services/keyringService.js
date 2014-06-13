var config = require('./js/config')
var keystore = require('./js/lib/keystore')(config)
var ssq = require('ssq')
var Keyring = ssq.Keyring(keystore)

var ssqServices = angular.module('services', [])

ssqServices.factory('Keyring', ['$location', 
  function($location) {
    return {
      instance: Keyring,
      unlock: function() {
        $location.path('/keyring/unlock')
      }
    }
  }
])
