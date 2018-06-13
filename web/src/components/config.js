require('dotenv').config()

/**
 * @namespace
 * @property {string} databaseUrl  Database config url
 */
const config = {
  databaseUrl: process.env.DATABASE_URL
}

function warn (...args) {
  console.warn('Configuration warning:', ...args)
}

function error (...args) {
  console.error('Configuration error:', ...args)
  process.exit(1)
}

// Desirable properties
[]
  .map(el => {
    if (!config[el]) {
      warn(`Property "${el}" is empty`)
    }
  });

// Expected properties
['databaseUrl']
  .map(el => {
    if (!config[el]) {
      error(`Property "${el}" is empty`)
    }
  })

module.exports = config
