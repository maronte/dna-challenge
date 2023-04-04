// Initialise logger
const { createLogger, format, transports } = require('winston')

const logger = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.align(),
        format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`)
      )
    })
  ]
})

module.exports = logger
