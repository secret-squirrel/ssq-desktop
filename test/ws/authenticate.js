var WebSocket = require('ws')
var path = require('path')
var openpgp = require('openpgp')
var authenticate = require('../../src/js/lib/ws/authenticate')
var keyring = require('../../src/js/lib/keyring')
var notify = require('../../src/js/lib/jsonrpc').notify
var testServer = require('../fixtures/server')
var keypair = require('../fixtures/keypair')

describe('ws/authenticate', function() {
  var port = 9998
  var uri = 'wss://localhost:' + port
  var ws, wss
  var privateKey = keypair.privateKey

  before(function() {
    wss = testServer.listen(port)
    ws = new WebSocket(uri, { rejectUnauthorized: false })
  })

  it("signs a challenge request with a public key", function(done) {
    wss.on('connection', function(ws) {
      ws.send(JSON.stringify(notify('challenge', { message: 'example' })))
      ws.on('message', function(str) {
        var msg = JSON.parse(str)
        var cleartextMesssage = openpgp.cleartext.readArmored(msg.params.signature)
        assert(openpgp.verifyClearSignedMessage([keypair.publicKey], cleartextMesssage), 'Challenge response is not verified')
        assert.equal(keypair.publicKey.primaryKey.fingerprint, msg.params.fingerprint)
        done()
      })
    })
    authenticate(privateKey, ws)
  })
})
