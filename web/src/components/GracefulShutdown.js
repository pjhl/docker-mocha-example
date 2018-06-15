const EventEmitter = require('events')

class GracefulShutdown extends EventEmitter {
  /**
   * @param {object} options
   * @param {number} options.delay Delay in ms. after receiving "SIGINT" (default: 30000)
   * @param {Promise<boolean>|null} options.condition Promise function-condition
   * @param {boolean} options.logs Display logs (default: true)
   **/
  constructor (options) {
    super()
    const {
      delay = 30000,
      condition = null,
      logs = true
    } = options
    this.delay = delay
    this.condition = condition
    this.logs = logs
    this._start()
  }

  _start () {
    // Listen sigint
    let isReceived = false
    process.on('SIGINT', () => {
      this.log('Graceful shutdown: received "SIGINT"')
      if (isReceived) {
        return
      }
      isReceived = true
      // Emit "start" event
      this.emit('start')
      // Force stop after delay
      setTimeout(() => {
        this.log(`Graceful shutdown: timeout of "${this.delay}" ms.`)
        process.exit()
      }, this.delay)
      // Try condition to exit immediately
      this._tryCondition()
    })
  }

  _tryCondition () {
    const condition = this.condition
    if (typeof condition === 'function') {
      const promise = condition()
      if (promise instanceof Promise) {
        promise
          .then((result) => {
            // Check condition result
            if (result) {
              this.log(`Graceful shutdown: condition let to exit`)
              process.exit()
            } else {
              setTimeout(this._tryCondition.bind(this), 100)
            }
          })
          .catch(err => {
            this.log(`Graceful shutdown: condition error catched: ${err.message}`)
            this.log(`Graceful shutdown: condition watching was disabled`)
          })
      }
    }
  }

  log (...args) {
    if (this.logs) {
      console.log(...args)
    }
  }
}

module.exports = GracefulShutdown
