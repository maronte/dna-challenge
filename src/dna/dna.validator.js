const Joi = require('joi')
const { VALID_VALUES } = require('./dna.business.model')

const schema = Joi.object({
  dna: Joi.array().items(
    Joi.string()
      .pattern(VALID_VALUES)
      .length(Joi.ref('$length'))
  )
    .required()
})

/**
 * Validates a dna structure. It needs to be an
 * array of strings and each string needs to have same length
 * of the main array. It needs to be like a square array.
 * Each given string needs to have only these characters:
 * A, C, G, T
 *
 * @param {Object} data
 */
const validate = async (data) => {
  await schema.validateAsync(
    data,
    { context: { length: data.dna ? data.dna.length : 0 } }
  )
}

module.exports = validate
