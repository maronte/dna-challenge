const logger = require('./logger')

const errorHandling = (err, req, res, next) => {
  logger.error(`Stack: \n ${err.stack}`)
  res.status(500).json({
    msg: err.message,
    success: false
  })
}

module.exports = {
  errorHandling
}
