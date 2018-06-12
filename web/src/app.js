const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const indexController = require('./controllers/index')
const todosController = require('./controllers/todos')

const app = new Koa()
app.use(bodyParser())

// Return errors as JSON
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = {
      error: {
        message: err.message
      }
    }
  }
})

app
  .use(indexController.routes())
  .use(indexController.allowedMethods())
  .use(todosController.routes())
  .use(todosController.allowedMethods())

if (!module.parent) {
  app.listen(8080) // TODO: Use port from env
} else {
  module.exports = app
}
