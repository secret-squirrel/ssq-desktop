var WsClient = require('../../src/js/lib/ws/client').WsClient
var keyring = require('../../src/js/lib/keyring')
var notify = require('../../src/js/lib/jsonrpc').notify
var dummyAuth = require('../fixtures/dummyAuthenticate')
var testServer = require('../fixtures/server')
var keypair = require('../fixtures/keypair')

describe('ws/client', function() {
  var port = 15000
  var wss, wsc
  var privateKey = keypair.privateKey

  beforeEach(function() {
    port += 1
    wss = testServer.listen(port)

    var uri = 'wss://localhost:' + port
    wsc = WsClient(uri, dummyAuth)
  })

  afterEach(function() {
    wss.close()
  })

  it('connects to a secure websocket server', function(done) {
    wss.on('connection', function(ws) {
      done()
    })

    wsc.connect(privateKey)
    .catch(function(err) {
      assert.notOk(err, 'Failed to connect: ' + err)
    })
  })

  it('sends notify messages', function(done) {
    wss.on('connection', function(ws) {
      ws.on('message', function(str) {
        var msg = JSON.parse(str)
        if(msg.method === 'hello') {
          assert.isUndefined(msg.id, 'Notify requests do not possess an id member')
          done()
        }
      })
    })

    wsc.connect(privateKey)
    .then(function() {
      return wsc.notify('hello')
    })
    .catch(function(err) {
      assert.notOk(err, 'Failed to notify: ' + err)
    })
  })

  it('sends request messages', function() {
    wss.on('connection', function(ws) {
      ws.on('message', function(str) {
        var msg = JSON.parse(str)
        if(msg.method === 'status') {
          var response = { jsonrpc: '2.0',
                           id: msg.id,
                           result: 'All systems go' }
          ws.send(JSON.stringify(response))
        }
      })
    })

    var promise = wsc.connect(privateKey)
    .then(function() {
      return wsc.request('status', null)
    })

    assert.eventually.equal(promise, 'All systems go')
  })
})
