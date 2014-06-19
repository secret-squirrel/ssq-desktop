module.exports = {
  node_env: function() {
    return process.env.NODE_ENV || 'development'
  }
}
