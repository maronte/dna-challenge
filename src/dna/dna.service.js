class DNAService {
  /**
   * Creates an DNA Service with all dependencies.
   *
   * @param {{
   *   validator: Function,
   *   repository: import('./dna.repository'),
   *   businessModel: import('./dna.business.model'),
   *   plainModel: import('./dna.plain.model')
   * }} config
   */
  constructor ({
    validator,
    repository,
    businessModel,
    plainModel
  }) {
    this.validator = validator
    this.repository = repository
    this.BusinessModel = businessModel
    this.PlainModel = plainModel
  }

  /**
   * Find or creates the given DNA Sequence.
   *
   * @param {{
   *  dna: Array<string>
   * }} dnaSequence
   * @returns {Promise<import('./dna.plain.model')>}
   */
  async findOrCreate (dnaSequence) {
    await this.validator(dnaSequence)
    const { dna: dnaData } = dnaSequence
    const dnaBussinessModel = new this.BusinessModel(dnaData)
    const dnaPlainModel = new this.PlainModel(dnaBussinessModel)
    const dnaRecord = await this.repository.getById(dnaPlainModel.id)
    if (dnaRecord) return dnaRecord
    dnaPlainModel.hasMutation = dnaBussinessModel.hasMutation()
    const newDna = await this.repository.create(dnaPlainModel)
    return newDna
  }

  /**
   * Find or creates the given DNA Sequence.
   *
   * @returns {Promise<import('./dna.plain.model')>}
   */
  async getStats () {
    const groupedDnas = await this.repository.getGrupedByHasMutation()
    const countMutations = groupedDnas.find(
      dna => dna.dataValues.hasMutation
    )
    const countNoMutation = groupedDnas.find(
      dna => dna.dataValues.hasMutation === false
    )
    const stats = {
      count_mutations: countMutations !== undefined
        ? countMutations.dataValues.total
        : 0,
      count_no_mutation: countNoMutation !== undefined
        ? countNoMutation.dataValues.total
        : 0
    }
    stats.ratio = stats.count_mutations / stats.count_no_mutation
    return stats
  }
}

module.exports = DNAService
