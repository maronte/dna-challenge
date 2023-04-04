const { Sequelize } = require('sequelize')
const { variables } = require('../config/config')

const sequelize = new Sequelize({
  dialect: 'mysql',
  database: variables.database.name,
  port: variables.database.port,
  username: variables.database.user,
  password: variables.database.pass,
  host: variables.database.host,
  pool: {
    max: 1,
    min: 1,
    /*
     * Set this value to 0 so connections are eligible for cleanup immediately after they're
     * returned to the pool.
     */
    idle: 0,
    // Choose a small enough value that fails fast if a connection takes too long to be established.
    acquire: 30000,
    /*
     * Ensures the connection pool attempts to be cleaned up automatically on the next Lambda
     * function invocation, if the previous invocation timed out.
     */
    evict: variables.lambda.timeout
  },
  define: {
    timestamps: false
  }
})

async function loadSequelize () {
  await sequelize.authenticate()
  return sequelize
}

module.exports = {
  sequelize,
  loadSequelize
}
