const app = require('./app')
const GracefulShutdown = require('./components/GracefulShutdown')

const server = app.listen(8080)

// Graceful shutdown
new GracefulShutdown({
  delay: 30000,
  condition: function () {
    return new Promise((resolve) => {
      server.getConnections((error, count) => {
        resolve(!error && count === 0)
      })
    })
  }
})
  .on('start', () => {
    // TODO: Tell server that shutdown started
  })
