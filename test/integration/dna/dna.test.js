const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../../../src/app')
const { expect } = chai

let sequelize = null
chai.use(chaiHttp)

describe('DNA Services', async () => {
  let server

  before(async () => {
    server = await app
    const db = require('../../../src/database/database')
    sequelize = db.sequelize
  })

  it('should store new dna with mutations', async () => {
    const bodyRequest = {
      dna: [
        'ATGCGA',
        'CAGTGC',
        'TTATGT',
        'AGAAGG',
        'CCCCTA',
        'TCACTG'
      ]
    }
    const response = await chai
      .request(server)
      .post('/mutation').send(bodyRequest)

    expect(response.status).to.be.equals(200)
    expect(response.body.data.hasMutation).to.be.equals(true)
  })

  it('should return dna with mutations already in database', async () => {
    const bodyRequest = {
      dna: [
        'ATGCGA',
        'CAGTGC',
        'TTATGT',
        'AGAAGG',
        'CCCCTA',
        'TCACTG'
      ]
    }
    const response = await chai
      .request(server)
      .post('/mutation').send(bodyRequest)

    expect(response.status).to.be.equals(200)
    expect(response.body.data.hasMutation).to.be.equals(true)
    expect(response.body.data.sequence).to.be.deep.equals(bodyRequest.dna)
  })

  it('should store new dna without mutations', async () => {
    const bodyRequest = {
      dna: [
        'ATGCGA',
        'CAGTGC',
        'TTATTT',
        'AGACGG',
        'GCGTCA',
        'TCACTG'
      ]
    }
    const response = await chai
      .request(server)
      .post('/mutation').send(bodyRequest)

    expect(response.status).to.be.equals(403)
    expect(response.body.data.hasMutation).to.be.equals(false)
  })

  it('should return dna without mutations already in database', async () => {
    const bodyRequest = {
      dna: [
        'ATGCGA',
        'CAGTGC',
        'TTATTT',
        'AGACGG',
        'GCGTCA',
        'TCACTG'
      ]
    }
    const response = await chai
      .request(server)
      .post('/mutation').send(bodyRequest)

    expect(response.status).to.be.equals(403)
    expect(response.body.data.hasMutation).to.be.equals(false)
    expect(response.body.data.sequence).to.be.deep.equals(bodyRequest.dna)
  })

  it('should store new dna without mutations', async () => {
    const expectedResponse = {
      count_mutations: 1,
      count_no_mutation: 1,
      ratio: 1
    }

    const response = await chai
      .request(server)
      .get('/stats')

    expect(response.status).to.be.equals(200)
    expect(response.body.data).to.be.deep.equals(expectedResponse)
  })

  after(async () => {
    await sequelize.query('TRUNCATE DNAs')
  })
})
