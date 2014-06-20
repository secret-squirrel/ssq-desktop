var fs = require('fs.extra')
var path = require('path')
var keypair = require('./fixtures/keypair')

describe('keystore', function() {
  var config = {
      userConfigDir: path.join(__dirname, '../tmp/config')
    }
  var keystore = require(path.join(__dirname, '../src/js/lib/keystore'))(config)

  var userId = 'test user <test@example.com>'
  var userConfig = {
    defaultKeyId: 'test',
    userId: userId
  }

  var privateKey = JSON.stringify([keypair.privateKeyEncrypted.armor()])
  var publicKey = JSON.stringify([keypair.publicKey.armor()])

  var configFile = path.join(config.userConfigDir, 'config.json')
  var pubringFile = path.join(config.userConfigDir, 'pubring.json')
  var secringFile = path.join(config.userConfigDir, 'secring.json')

  beforeEach(function() {
    fs.mkdirpSync(config.userConfigDir)
    fs.writeFileSync(configFile, JSON.stringify(userConfig))
    fs.writeFileSync(pubringFile, [publicKey])
    fs.writeFileSync(secringFile, [privateKey])
  })

  afterEach(function() {
    fs.rmrfSync(config.userConfigDir)
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

  it('stores private key data', function() {
    var promise = keystore.storePrivate(privateKey)
    .then(function() {
      return fs.existsSync(path.join(config.userConfigDir, 'secring.json'))
    })

    assert.eventually.equal(promise, true)
  })

  it('loads private key data', function() {
    var promise = keystore.storePrivate(privateKey).then(keystore.loadPrivate)
    return assert.eventually.equal(promise, privateKey)
  })

  it('stores public keys', function() {
    var promise = keystore.storePublic(publicKey)
    .then(function() {
      return fs.existsSync(path.join(config.userConfigDir, 'pubring.json'))
    })

    return assert.eventually.equal(promise, true)
  })

  it('loads public keys', function() {
    var promise = keystore.storePublic(publicKey)
    .then(keystore.loadPublic)

    return assert.eventually.equal(promise, publicKey)
  })

  it('creates the configuration dir if necessary', function() {
    fs.rmrfSync(config.userConfigDir)
    var promise = keystore.storePublic(publicKey)
    .then(function() {
      return fs.existsSync(path.join(config.userConfigDir, 'pubring.json'))
    })

    return assert.eventually.equal(promise, true)
  })
})
