require('./components/config')
const app = require('./app')

// Test postgres connection
const { knex } = require('./components/db')

function test () {
  knex
    .raw(`SELECT 1 AS "r"`)
    .then(response => {
      console.log('~~~~ Response:', response.rows[0].r)
    })
    .catch(err => {
      console.log('~~~ Error:', err)
    })
}

// Test periodically
setInterval(() => {
  test()
}, 1000)
// Test immediately
test()

app.listen(8080)
