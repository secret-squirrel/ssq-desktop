require('array.prototype.find')
var Q = require('Q')
var openpgp = require('openpgp')

module.exports = function(storeHandler) {
  var publicKeys = []
  var privateKeys = []
  var userConfig = {}
  var defaultKey
  var isEncrypted = true

  function load(passPhrase) {
    return Q.all([
      storeHandler.loadUserConfig()
      .then(function(config) {
        userConfig = config
      }),
      storeHandler.loadPrivate()
      .then(function(data) {
        loadPrivateKeys(data, passPhrase)
      }),
      storeHandler.loadPublic()
      .then(function(data) {
        loadPublicKeys(data)
      })
    ])
  }

  function loadPrivateKeys(data, passPhrase) {
    var keys = deserializeKeys(data)
    privateKeys = privateKeys.concat(keys)
    if(!privateKeys || privateKeys.length === 0) {
      throw 'No private keys found! Please create a keypair and try again.'
    }
    defaultKey = privateKeys[0]
    if(userConfig && userConfig.defaultKeyId) {
      var key = findKey(privateKeys, userConfig.defaultKeyId)
      if(key) defaultKey = key
    }
    if(!defaultKey) {
      throw 'No default key available'
    }
    if(!defaultKey.decrypt(passPhrase)) {
      throw 'Unable to decrypt default private key'
    } else {
      isEncrypted = false
    }
  }

  function loadPublicKeys(data) {
    var keys = deserializeKeys(data)
    publicKeys = publicKeys.concat(keys)
  }

  function store() {
    return Q.all([
      storeHandler.storePrivate(serializeKeys(privateKeys)),
      storeHandler.storePublic(serializeKeys(publicKeys)),
      storeHandler.storeUserConfig(userConfig, { mode: 384 })
    ])
  }

  function deserializeKeys(data) {
    var armoredKeys = JSON.parse(data.toString('utf8'))
    return armoredKeys.reduce(function(keys, armoredKey) {
      var key = openpgp.key.readArmored(armoredKey)
      if(key.err) {
        console.log('Error reading armored key:')
        console.log(armoredKey)
      } else {
        keys.push(key.keys[0])
      }
      return keys
    }, [])
  }

  function serializeKeys(keys) {
    return JSON.stringify(keys.map(function(key) {
      return key.armor()
    }))
  }

  function clear() {
    publicKeys = []
    privateKeys = []
  }

  function createKeyPair(passPhrase, userId, bits) {
    if(!bits) bits = 2048

    return Q.fcall(function() {
      defaultKey = openpgp.key.generate({
        numBits: bits,
        userId: userId,
        passphrase: passPhrase
      })
      userConfig.defaultKeyId = defaultKey.primaryKey.getKeyId().toHex()

      privateKeys.push(defaultKey)
      publicKeys.push(defaultKey.toPublic())
    })
  }

  function getPrivateKeys() {
    return privateKeys
  }

  function getPublicKeys() {
    return publicKeys
  }

  function getDefaultKey() {
    return defaultKey
  }

  function findKey(keys, keyId) {
    return keys.find(function(key) {
      if (keyId.length === 16) {
        return keyId === key.primaryKey.getKeyId().toHex();
      } else {
        return keyId === key.primaryKey.getFingerprint();
      }
    })
  }

  function isLocked() {
    return isEncrypted
  }

  return {
    publicKeys: getPublicKeys,
    privateKeys: getPrivateKeys,
    defaultKey: getDefaultKey,
    load: load,
    store: store,
    clear: clear,
    createKeyPair: createKeyPair,
    isLocked: isLocked
  }
}
