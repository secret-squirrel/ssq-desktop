var uuid = require('node-uuid')

function buildRequest(method, params) {
  return {
    jsonrpc: '2.0',
    method: method,
    params: params
  }
}

module.exports = {
  notify: function(method, params) {
    return buildRequest(method, params)
  },
  request: function(method, params) {
    var req = buildRequest(method, params)
    req.id = uuid.v4()
    return req
  }
}

