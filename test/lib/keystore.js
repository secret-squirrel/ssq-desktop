var fs = require('fs')
var path = require('path')
var rimraf = require('rimraf')

describe('keystore', function() {
  var config = {
      userConfigDir: path.join(__dirname, '../../tmp/config')
    }
  var keystore = require(path.join(__dirname, '../../src/js/lib/keystore'))(config)

  var userId = 'test user <test@example.com>'
  var userConfig = {
    defaultKeyId: 'test',
    userId: userId
  }

  var privateKey = fs.readFileSync(path.join(__dirname, '../fixtures/data/private-key.asc'))
  var publicKey = fs.readFileSync(path.join(__dirname, '../fixtures/data/public-key.asc'))

  var configFile = path.join(config.userConfigDir, 'config.json')
  var pubringFile = path.join(config.userConfigDir, 'pubring.json')
  var secringFile = path.join(config.userConfigDir, 'secring.json')

  beforeEach(function() {
    fs.mkdirSync(config.userConfigDir)
    fs.writeFileSync(configFile, JSON.stringify(userConfig))
    fs.writeFileSync(pubringFile, [publicKey])
    fs.writeFileSync(secringFile, [privateKey])
  })

  afterEach(function() {
    rimraf.sync(config.userConfigDir)
  })

  describe('checkConfig', function() {
    it('is true when user config, pubring, and secring are present', function(done) {
      assert.isFulfilled(keystore.checkConfig()).notify(done)
    })

    it('checks for a user config', function(done) {
      fs.unlinkSync(configFile)
      assert.isRejected(keystore.checkConfig()).notify(done)
    })

    it('checks for a public key ring file', function(done) {
      fs.unlinkSync(pubringFile)
      assert.isRejected(keystore.checkConfig()).notify(done)
    })

    it('checks for a secret key ring file', function(done) {
      fs.unlinkSync(pubringFile)
      assert.isRejected(keystore.checkConfig()).notify(done)
    })
  })
})
