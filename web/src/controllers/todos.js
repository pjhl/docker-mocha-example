const Router = require('koa-router')
const Todo = require('../models/Todo')

const router = new Router()

// List
router.get('/todos', async (ctx) => {
  const collection = await Todo.fetchAll()
  ctx.body = collection.toJSON()
})

// Get one
router.get('/todos/:id(\\d+)', async (ctx) => {
  const model = await Todo
    .forge({id: ctx.params.id})
    .fetch()
  if (!model) {
    ctx.throw(404, 'NotFound')
  }
  ctx.body = {data: model.toJSON()}
})

// Create
router.put('/todos', async (ctx) => {
  const {
    title = '',
    done = false
  } = ctx.request.body
  const model = await new Todo({title, done})
    .save()
  ctx.body = {data: model.toJSON()}
})

// Update
router.post('/todos/:id(\\d+)', async (ctx) => {
  const model = await Todo
    .forge({id: ctx.params.id})
    .fetch()
  if (!model) {
    ctx.throw(404, 'NotFound')
  }
  const {
    title = '',
    done = false
  } = ctx.request.body
  await model.set({
    title,
    done: done !== undefined
      ? Boolean(done)
      : model.get('done')
  })
    .save()
  ctx.body = {data: model.toJSON()}
})

// Delete
router.delete('/todos/:id(\\d+)', async (ctx) => {
  const model = await Todo
    .forge({id: ctx.params.id})
    .fetch()
  if (!model) {
    ctx.throw(404, 'NotFound')
  }
  const json = model.toJSON()
  await model.destroy()
  ctx.body = {data: json}
})

module.exports = router
