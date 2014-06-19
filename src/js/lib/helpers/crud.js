module.exports = function(modelName) {
  return {
    create: function(context, fields) {
      return context.client.request(modelName + '.create', fields)
    },
    update: function(context, fields) {
      return context.client.request(modelName + '.update', fields)
    },
    index: function(context, where) {
      return context.client.request(modelName + '.index', where)
    },
    get: function(context, id) {
      return context.client.request(modelName + '.get', id)
    },
    del: function(context, id) {
      return context.client.request(modelName + '.del', id)
    }
  }
}

