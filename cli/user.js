var modelName = 'user'
var model = require('../index').User
var tableColumns = ['id', 'name', 'email', 'isAdmin']
var crud = require('./helpers/crud')(model, modelName, tableColumns)

function create() {
  crud.create({
    properties: {
      name: {
        allowEmpty: false,
        description: 'Enter a name: '
      },
      email: {
        format: 'email',
        allowEmpty: false,
        description: 'Enter an email: '
      }
    }
  })
}

function list() {
  crud.list({})
}

function update() {
  crud.update({
    properties: {
      id: {
        format: 'id',
        allowEmpty: false,
        description: 'Enter the ID of the ' + modelName + ' you wish to update: '
      },
      name: {
        allowEmpty: false,
        description: 'Enter an updated name for this ' + modelName + ': '
      },
      email: {
        format: 'email',
        allowEmpty: false,
        description: 'Enter an updated email: '
      }
    }
  })
}

function del() {
  crud.del({
    properties: {
      id: {
        format: 'id',
        allowEmpty: false,
        description: 'Enter the ID of the ' + modelName + ' you wish to delete: '
      }
    }
  })
}

module.exports = function(program) {
  crud.registerCommands(program, create, list, update, del)
}
