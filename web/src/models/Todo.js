const { bookshelf } = require('../components/db')

const Todo = bookshelf.Model.extend({
  tableName: 'todos'
})

module.exports = Todo
