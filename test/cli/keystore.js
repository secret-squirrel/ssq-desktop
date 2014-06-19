var path = require('path')
var fs = require('fs.extra')
var keypair = require('../fixtures/keypair')

describe('keystore', function() {
  var config = {
      userConfigDir: path.join(__dirname, '../../tmp/config')
    }
  var privateKeyData = JSON.stringify([keypair.privateKeyEncrypted.armor()])
  var publicKeyData = JSON.stringify([keypair.publicKey.armor()])
  var keystore

  before(function() {
    keystore = require('../../cli/keystore')(config)
  })

  beforeEach(function() {
    fs.rmrfSync(config.userConfigDir)
    fs.mkdirpSync(config.userConfigDir)
  })

  it('stores private key data', function() {
    var promise = keystore.storePrivate(privateKeyData)
    .then(function() {
      return fs.existsSync(path.join(config.userConfigDir, 'secring.json'))
    })

    assert.eventually.equal(promise, true)
  })

  it('loads private key data', function() {
    var promise = keystore.storePrivate(privateKeyData).then(keystore.loadPrivate)
    return assert.eventually.equal(promise, privateKeyData)
  })

  it('stores public keys', function() {
    var promise = keystore.storePublic(publicKeyData)
    .then(function() {
      return fs.existsSync(path.join(config.userConfigDir, 'pubring.json'))
    })

    return assert.eventually.equal(promise, true)
  })

  it('loads public keys', function() {
    var promise = keystore.storePublic(publicKeyData)
    .then(keystore.loadPublic)

    return assert.eventually.equal(promise, publicKeyData)
  })
})
