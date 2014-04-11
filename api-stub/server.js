var fs = require('fs');
var path = require('path');
var https = require('https');
var WebSocketServer = require('ws').Server;
var httpsServer;
var wss;

function dummyRequestHandler(req, res) {
  res.writeHead(200);
  res.end('fdhveery');
}

function listen(port) {
  var httpsServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, '../tests/fixtures/server/test-key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../tests/fixtures/server/test-cert.pem'))
  }, dummyRequestHandler);

  httpsServer.listen(port);

  wss = new WebSocketServer({
    server: httpsServer
  });

  console.log((new Date()) + ' Starting server on port: ' + port);
  return wss;
}

wss = listen(9998);