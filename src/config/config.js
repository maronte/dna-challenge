const variables = {
  database: {
    name: process.env.databaseName || 'dna',
    port: process.env.databasePort || '3306',
    user: process.env.databaseUser || 'root',
    pass: process.env.databasePassword || '',
    host: process.env.databaseHost || 'localhost'
  },
  lambda: {
    timeout: process.env.lambdaTimeout || 20000
  }
}

module.exports = {
  variables
}
