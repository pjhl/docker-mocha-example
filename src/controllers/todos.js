const Router = require('koa-router')

const router = new Router()

const TODOS_MOCK = [ // TODO: remove this mock
  {
    id: 1,
    title: 'Learn basic JS',
    done: true
  }, {
    id: 2,
    title: 'Learn ES6',
    done: true
  }, {
    id: 3,
    title: 'View on ES2017',
    done: false
  }, {
    id: 4,
    title: 'More practice with async',
    done: false
  }
]
let currentId = 4

// List
router.get('/todos', (ctx) => {
  ctx.body = {data: TODOS_MOCK}
})

// Get one
router.get('/todos/:id(\\d+)', (ctx) => {
  const todo = TODOS_MOCK
    .find(el => el.id === Number(ctx.params.id))
  if (!todo) {
    ctx.throw(404, 'NotFound')
  }
  ctx.body = {data: todo}
})

// Create
router.put('/todos', (ctx) => {
  const {
    title = '',
    done = false
  } = ctx.request.body
  const id = ++currentId
  const todo = {
    id,
    title,
    done
  }
  TODOS_MOCK.push(todo)
  ctx.body = {data: todo}
})

// Update
router.post('/todos/:id(\\d+)', (ctx) => {
  const todo = TODOS_MOCK
    .find(el => el.id === Number(ctx.params.id))
  if (!todo) {
    ctx.throw(404, 'NotFound')
  }
  const {
    title = '',
    done = false
  } = ctx.request.body
  if (title) {
    todo.title = title
  }
  if (done !== undefined) {
    todo.done = Boolean(done)
  }
  ctx.body = {data: todo}
})

// Delete
router.delete('/todos/:id(\\d+)', (ctx) => {
  const index = TODOS_MOCK
    .findIndex(el => el.id === Number(ctx.params.id))
  if (index === -1) {
    ctx.throw(404, 'NotFound')
  }
  const todo = TODOS_MOCK[index]
  TODOS_MOCK.splice(index, 1)
  ctx.body = todo
})

module.exports = router
