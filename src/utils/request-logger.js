const logger = require('./logger')

const loggerMiddleware = (req, res, next) => {
  const reqData = `
    originalUrl - ${req.originalUrl}\n
    method - ${req.method}\n
    params - ${JSON.stringify(req.params)}\n
    query - ${JSON.stringify(req.query)}\n
    body - ${JSON.stringify(req.body)}
    `
  logger.info(reqData)
  next()
}

module.exports = loggerMiddleware
