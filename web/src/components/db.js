const config = require('./config')

const knex = require('knex')({
  client: 'pg',
  connection: config.databaseUrl
})
const bookshelf = require('bookshelf')(knex)

console.log('Connection:.....')

module.exports = {
  knex: knex,
  bookshelf: bookshelf
}
