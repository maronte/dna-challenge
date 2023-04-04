const port = process.env.port || 3000
const appPromise = require('./app')

const initializeApp = async () => {
  const app = await appPromise
  app.listen(port, () => {
    console.log(`Running app into ${port} port`)
  })
}

initializeApp()
