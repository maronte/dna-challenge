// Import base app dependencies
require('express-async-errors')
const express = require('express')
const cors = require('cors')
const { loadSequelize } = require('./database/database')
const { configureRoutes } = require('./routes')
const { errorHandling } = require('./utils/error-handler')

const app = express()

// Initialize app
const initializeApp = async () => {
  // Configuration for express app
  app.use(express.json())
  app.use(cors())

  // Init DB
  await loadSequelize()

  // Add module routers
  configureRoutes(app)

  // Add error handler
  app.use(errorHandling)

  return app
}

module.exports = initializeApp().then(app => app)
