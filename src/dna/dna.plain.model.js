const md5 = require('crypto-js/md5')

class DNA {
  /**
   * Creates a DNA model with plan data to store it.
   *
   * @param {import("./dna.business.model")} dnaBussinessModel
   */
  constructor (dnaBussinessModel) {
    this.id = md5(dnaBussinessModel.identifiableSequence).toString()
    this.sequence = dnaBussinessModel.sequence
    this.hasMutation = dnaBussinessModel.hasMutationValue !== undefined
      ? dnaBussinessModel.hasMutationValue
      : null
  }
}

module.exports = DNA
