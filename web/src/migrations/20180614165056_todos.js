
exports.up = function (knex, Promise) {
  return knex
    .schema
    .createTable('todos', function (table) {
      table.increments()
      table.string('title', 255)
      table.boolean('done')
    })
}

exports.down = function (knex, Promise) {
  return knex
    .schema
    .dropTableIfExists('todos')
}
