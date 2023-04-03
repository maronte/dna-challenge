const { expect } = require('chai')
const DNA = require('../../src/dna/dna')

describe('DNA Class Tests', () => {
  context('hasMutation', () => {
    it('should return true for vertical and slash mutation pattern', () => {
      const dnaWithMutation = [
        'ATGCGA',
        'CAGTGC',
        'TTATGT',
        'AGAAGG',
        'CCCCTA',
        'TCACTG'
      ]
      const dna = new DNA(dnaWithMutation)
      expect(dna.hasMutation()).to.be.equals(true)
    })
    it('should return true for horizontal and reverse slash mutation pattern', () => {
      const dnaWithMutation = [
        'ATGCGA',
        'CCGTTC',
        'TTATGC',
        'AGAACG',
        'CCCCTA',
        'TCCCTG'
      ]
      const dna = new DNA(dnaWithMutation)
      expect(dna.hasMutation()).to.be.equals(true)
    })
    it('should return false for dna without mutation pattern', () => {
      const dnaWithoutMutation = [
        'ATGCGA',
        'CAGTGC',
        'TTATTT',
        'AGACGG',
        'GCGTCA',
        'TCACTG'
      ]
      const dna = new DNA(dnaWithoutMutation)
      expect(dna.hasMutation()).to.be.equals(false)
    })
  })
})
