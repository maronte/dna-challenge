const dnaModule = require('./dna/dna.router')

/**
 * Add each module router into app.
 *
 * @param {import('express').Express} app
 */
const configureRoutes = (app) => {
  app.use(dnaModule)
}

module.exports = { configureRoutes }
