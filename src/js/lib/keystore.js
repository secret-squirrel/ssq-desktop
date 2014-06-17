var Q = require('Q')
var path = require('path')
var fs = require('fs')

var readFile = Q.nfbind(fs.readFile)
var writeFile = Q.nfbind(fs.writeFile)

module.exports = function(config) {
  var configDir = config.userConfigDir
  var pubring = path.join(configDir, 'pubring.json')
  var secring = path.join(configDir, 'secring.json')
  var userConfig = path.join(configDir, 'config.json')

  function loadUserConfig() {
    var file = path.join(configDir, userConfig)
    return readFile(file)
    .then(JSON.parse)
    .catch(function(error) {
      if(error.code === 'ENOENT') {
        return {}
      } else {
        throw error
      }
    })
  }

  function hasSaneConfig() {
    return checkUserConfig()
      .then(checkPubring)
      .then(checkSecring)
      .then(function() {
        return {
          result: true
        }
      })
      .catch(function(error) {
        return {
          result: false,
          error: error
        }
      })
  }

  function checkUserConfig() {
    return readFile(userConfig)
      .then(JSON.parse)
      .then(function(configObj) {
        assert(configObj.defaultKeyId && configObj.defaultKeyId.length > 0, 
          'userConfig is missing defaultKeyId')
      })
      .catch(function(error) {
        throw 'Checking user config failed: ' + error.toString()
      })
  }

  function checkPubring() {
    return readFile(pubring)
      .then(function(pubringStr) {
        assert(pubringStr && pubringStr.length > 0, 'pubring is empty')
      })
      .catch(function(error) {
        throw 'Checking pubring failed: ' + error.toString()
      })
  }

  function checkSecring() {
    return readFile(secring)
      .then(function(secringStr) {
        assert(secringStr && secringStr.length > 0, 'secring is empty')
      })
      .catch(function(error) {
        throw 'Checking secring failed: ' + error
      })
  }

  return {
    loadPublic: function () {
      return readFile(pubring)
    },
    loadPrivate: function () {
      return readFile(secring)
    },
    storePublic: function (data) {
      return writeFile(pubring, data, null)
    },
    storePrivate: function(data) {
      return writeFile(secring, data, { mode: 384 })
    },
    storeUserConfig: function(config, fileOptions) {
      return writeFile(userConfig, JSON.stringify(config), fileOptions)
    },
    loadUserConfig: loadUserConfig,
    hasSaneConfig: hasSaneConfig
  }
}
