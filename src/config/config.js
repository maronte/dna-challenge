const variables = {
  database: {
    name: process.env.databaseName || 'dna',
    port: process.env.databasePort || '3306',
    user: process.env.databaseUser || 'root',
    host: process.env.databaseHost || 'localhost'
  },
  lambda: {
    timeout: process.env.lambdaTimeout || 2000
  }
}

module.exports = {
  variables
}
