const HTTP_STATUS = require('../utils/http-status')
const DNAValidator = require('./dna.validator')
const DNABusinessModel = require('./dna.business.model')
const DNAPlainModel = require('./dna.plain.model')
const DNADBModel = require('./dna.db.model')
const DNARepository = require('./dna.repository')
const DNAService = require('./dna.service')

const dnaRepository = new DNARepository(DNADBModel)
const dnaService = new DNAService({
  validator: DNAValidator,
  repository: dnaRepository,
  businessModel: DNABusinessModel,
  plainModel: DNAPlainModel
})

/**
 * Find or creates a dna
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const findOrCreate = async (req, res) => {
  const mutationDnaData = req.body
  const dnaModel = await dnaService.findOrCreate(mutationDnaData)
  if (dnaModel.hasMutation) {
    res.status(HTTP_STATUS.OK).json({ data: dnaModel }).send()
  } else {
    res.status(HTTP_STATUS.FORBIDDEN).json({ data: dnaModel }).send()
  }
}

/**
 * Get stats that counts stored dnas it returns couting by
 * has mutation.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const getStats =
    async (req, res) => {
      const dnaStats = await dnaService.getStats()
      res.status(200).json({ data: dnaStats, status: 200 }).send()
    }

module.exports = {
  findOrCreate,
  getStats
}
