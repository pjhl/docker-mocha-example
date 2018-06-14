const { databaseUrl } = require('./config')
const path = require('path')

module.exports = {
  client: 'pg',
  connection: databaseUrl,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'migrations',
    directory: path.join(__dirname, '../migrations')
  }
}
