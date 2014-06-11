var Q = require('Q')
var path = require('path')
var fs = require('fs')

var readFile = Q.nfbind(fs.readFile)
var writeFile = Q.nfbind(fs.writeFile)

module.exports = function(config) {
  var configDir = config.userConfigDir
  var pubring = 'pubring.json'
  var secring = 'secring.json'
  var userConfig = 'config.json'

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

  function storeUserConfig(config, fileOptions) {
    var file = path.join(configDir, userConfig)
    return writeFile(file, JSON.stringify(config), fileOptions)
  }

  return {
    loadPublic: function () {
      return readFile(path.join(configDir, pubring))
    },
    loadPrivate: function () {
      return readFile(path.join(configDir, secring))
    },
    storePublic: function (data) {
      return writeFile(path.join(configDir, pubring), data, null)
    },
    storePrivate: function(data) {
      return writeFile(path.join(configDir, secring), data, { mode: 384 })
    },
    loadUserConfig: loadUserConfig,
    storeUserConfig: storeUserConfig
  }
}
