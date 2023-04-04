class DNARepository {
  /**
   * Creates and DNARepository
   * @param {import('sequelize').Model} model
   */
  constructor (model) {
    this.model = model
  }

  /**
   * Get DNA by the given id.
   *
   * @param {string} id
   * @returns {Promise<import('sequelize').Model>}
   */
  async getById (id) {
    return this.model.findByPk(id)
  }

  /**
   * Get DNA by the given id.
   *
   * @param {import('./dna.plain.model')} dna
   * @returns {Promise<import('sequelize').Model>}
   */
  async create (dna) {
    return this.model.create(dna)
  }

  /**
   * Get DNA by the given id.
   *
   * @param {import('./dna.plain.model')} dna
   * @returns {Promise<Array<import('sequelize').Model>>}
   */
  async getGrupedByHasMutation (dna) {
    return this.model.findAll({
      attributes: [
        'hasMutation',
        [this.model.sequelize.fn('COUNT', this.model.sequelize.col('id')), 'total']
      ],
      group: ['hasMutation']
    })
  }
}

module.exports = DNARepository
