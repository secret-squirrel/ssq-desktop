var fs = require('fs')
var path = require('path')
var openpgp = require('openpgp')

var passPhrase = 's00pers3krit'

function loadKey(fileName) {
  var keyText = fs.readFileSync(path.join(__dirname, 'data/' + fileName)).toString()
  return openpgp.key.readArmored(keyText).keys[0]
}

var privateKeyEncrypted = loadKey('private-key.asc')

var privateKey = loadKey('private-key.asc')
privateKey.decrypt(passPhrase)

module.exports =  {
  privateKeyEncrypted: privateKeyEncrypted,
  privateKey: privateKey,
  publicKey: loadKey('public-key.asc')
}
