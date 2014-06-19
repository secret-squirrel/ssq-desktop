var fs = require('fs')
var path = require('path')
var https = require('https')
var WebSocketServer = require('ws').Server
var httpsServer, wss

var dataPath = path.join(__dirname, 'data/server')

function dummyRequestHandler(req, res) {
  res.writeHead(200)
  res.end('fdhveery')
}

function listen(port) {
  var httpsServer = https.createServer({
    key: fs.readFileSync(path.join(dataPath, 'test-key.pem')),
    cert: fs.readFileSync(path.join(dataPath, 'test-cert.pem'))
  }, dummyRequestHandler)

  httpsServer.listen(port)

  wss = new WebSocketServer({
    server: httpsServer
  })

  return wss
}
module.exports = {
  listen: listen
}
