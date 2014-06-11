var path = require('path')

module.exports = {
  server: {
    uri: 'wss://localhost:5000'
  },
  userConfigDir: path.join(process.env['HOME'], '.squirrel')
}

