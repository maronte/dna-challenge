/**
 * Express configuration for aws lambda
 */
const serverlessExpress = require('@vendia/serverless-express')
const appPromise = require('./app')

let serverlessExpressInstance = null

const setup = async (event, context) => {
  const app = await appPromise
  serverlessExpressInstance = serverlessExpress({ app })
  return serverlessExpressInstance(event, context)
}

const handler = async (event, context) => {
  if (serverlessExpressInstance) return serverlessExpressInstance(event, context)
  return setup(event, context)
}

exports.handler = handler
