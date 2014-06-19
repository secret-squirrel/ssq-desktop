var fs = require('fs')
var path = require('path')
var openpgp = require('openpgp')
var passPhrase = 's00pers3krit'
var userId = 'test user <test@example.com>'
var bits = 512

describe('keyring', function() {
  var config = {
      userConfigDir: path.join(__dirname, '../tmp/config')
    }
  var keystore = require('../cli/keystore')(config)
  var keyring

  before(function() {
    keyring = require('../src/js/lib/keyring')(keystore)
  })

  afterEach(function() {
    keyring.clear()
  })

  it('creates a public/private keypair', function(done) {
    keyring.createKeyPair(passPhrase, userId, bits)
    .then(function() {
      assert.equal(keyring.publicKeys().length, 1)
      assert.equal(keyring.privateKeys().length, 1)
      done()
    })
  })

  it('clears the keyring', function(done) {
    keyring.createKeyPair(passPhrase, userId, bits)
    .then(function() {
      assert.equal(keyring.publicKeys().length, 1)
      assert.equal(keyring.privateKeys().length, 1)
      keyring.clear()
      assert.equal(keyring.publicKeys().length, 0)
      assert.equal(keyring.privateKeys().length, 0)
      done()
    })
  })

  it('stores the keyring', function(done) {
    keyring.createKeyPair(passPhrase, userId, bits)
    .then(function() {
      keyring.store()
      .then(function() {
        var privateKeys = path.join(config.userConfigDir, 'secring.json')
        var publicKeys = path.join(config.userConfigDir, 'pubring.json')
        assert(fs.existsSync(privateKeys), 'Saves private keys to disk')
        assert(fs.existsSync(publicKeys), 'Saves public keys to disk')
        done()
      })
      .catch(function(err) {
        assert.notOk(err)
      })
    })
  })

  it('loads the keyring', function(done) {
    keyring.createKeyPair(passPhrase, userId, bits)
    .then(function() {
      keyring.store()
      .then(function() {
        var newKeyring = require('../src/js/lib/keyring')(keystore)
        return newKeyring.load(passPhrase)
        .then(function() {
          assert.equal(newKeyring.publicKeys().length, 1)
          assert.equal(newKeyring.privateKeys().length, 1)
          done()
        })
      })
      .catch(function(err) {
        assert.notOk(err)
      })
    })
  })
})
