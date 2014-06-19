var Q = require('Q')
var openpgp = require('openpgp')
var notify = require('../jsonrpc').notify

function authenticate(privateKey, ws) {
  var deferred = Q.defer()
  var handshake = function(str) {
    var msg = JSON.parse(str)
    switch(msg.method) {
      case 'challenge':
        var challenge = msg.params.message
        var algorithm = 'sha256'
        var signature = openpgp.signClearMessage([privateKey], challenge)
        var params = {
          fingerprint: privateKey.toPublic().primaryKey.fingerprint,
          algorithm: algorithm,
          signature: signature
        }
        var response = notify('response', params)
        ws.send(JSON.stringify(response))
        break

      case 'success':
        ws.removeListener('message', handshake)
        deferred.resolve(msg.params.user)
        break

      case 'error':
        console.log('Authentication error:', msg.params.msg)
        ws.removeListener('message', handshake)
        deferred.reject({msg: str})
        break

      default:
        console.log('Unexpected request from server: ' + str)
        break
    }
  }

  ws.on('message', handshake)

  return deferred.promise
}

module.exports = authenticate
