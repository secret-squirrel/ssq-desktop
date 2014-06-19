var Q = require('Q')
var WebSocket = require('ws')
var env = require('../../env')
var jsonrpc = require('../jsonrpc')

function WsClient(uri, authenticate) {
  var deferreds = {}, ws

  function awaitResponse(id, deferred) {
    deferreds[id] = {
      deferred: deferred,
      timer: setTimeout(function() {
        console.log('Timed out.')
        delete deferreds[id]
        close()
      }, 5000)
    }
  }

  function connect(privateKey) {
    var options = {}
    if(env.node_env() === 'development' || env.node_env() === 'test') {
      options.rejectUnauthorized = false
    }
    var deferred = Q.defer()

    ws = new WebSocket(uri, options)

    ws.on('open', function(err) {
      if(err) {
        deferred.reject(err)
      } else {
        authenticate(privateKey, ws)
        .then(function(user) {
          ws.on('message', handleMessage)
          deferred.resolve(user)
        })
        .catch(function(err) {
          deferred.reject(err)
        })
      }
    })

    return deferred.promise
  }

  function handleMessage(str) {
    var msg = JSON.parse(str)
    if(isResponse(msg)) {
      handleResponse(msg)
    } else {
      // TODO: dispatch to RPC!
      console.log('Received request from server: ' + str)
    }
  }

  function handleResponse(response) {
    if(response.id) {
      var deferred = deferreds[response.id].deferred
      clearTimeout(deferreds[response.id].timer)
      if(response.error) {
        deferred.reject(response.error)
      } else {
        deferred.resolve(response.result)
      }
      delete deferreds[response.id]
    }
  }

  function isResponse(msg) {
    return msg.result !== undefined || msg.error !== undefined
  }

  function close() {
    clearAllTimeouts()
    return Q.nfcall(ws.close)
  }

  function clearAllTimeouts() {
    Object.keys(deferreds).forEach(function(key) { 
      clearTimeout(deferreds[key].timeout) 
    })
  }

  function request(method, params) {
    var deferred = Q.defer()
    var msg = jsonrpc.request(method, params)
    awaitResponse(msg.id, deferred)
    ws.send(JSON.stringify(msg), function(err) {
      if(err) deferred.reject(err)
    })

    return deferred.promise
  }

  function notify(method, params) {
    var deferred = Q.defer()
    ws.send(JSON.stringify(jsonrpc.notify(method, params)), function(err) {
      if(err) deferred.reject(err)
      else deferred.resolve()
    })

    return deferred.promise
  }

  return {
    connect: connect,
    close: close,
    request: request,
    notify: notify
  }
}

module.exports = {
  WsClient: WsClient
}
