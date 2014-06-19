var modelName = 'login'
var model = require('../index').Login
var tableColumns = ['id', 'name', 'url', 'notes']
var crud = require('./helpers/crud')(model, modelName, tableColumns)

function create() {
  crud.create({
    properties: {
      name: {
        allowEmpty: false,
        description: 'Enter a name for the new ' + modelName + ':'
      },
      url: {
        format: 'url',
        allowEmpty: false,
        description: 'Enter a url: '
      },
      notes: {
        allowEmpty: false,
        description: 'Enter a description: '
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
      url: {
        format: 'url',
        allowEmpty: false,
        description: 'Enter an updated url: '
      },
      notes: {
        description: 'Enter an updated description: '
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
