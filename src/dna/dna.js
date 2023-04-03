/**
 * Represents a DNA and operates with it.
 */
class DNA {
  /**
   * Creates an DNA class
   *
   * @param {Array<string>} data
   */
  constructor (data) {
    this.sequence = data
  }

  /**
   * Transform and sets the sequence into an array of string arrays to
   * process the sequence like the mutation detection. This method
   * will set the processableSequence property.
   */
  setProcessableSequence () {
    if (!this.processableSequence) {
      this.processableSequence = this.sequence.map((sequenceRow) =>
        sequenceRow.split('')
      )
    }
  }

  /**
   * Transform and sets the sequence into a unique string with all
   * DNA data to identify easily. This method will set the
   * identifiableSequence property.
   */
  setIdentifiableSequence () {
    if (!this.identifiableSequence) {
      this.identifiableSequence = this.sequence.reduce(
        (sequenceRow, sequenceString) => sequenceString + sequenceRow,
        ''
      )
    }
  }

  /**
   * Checks if the current DNA has mutations this is, at least
   * two partterns. Patterns will be four repeated values in
   * any direction. For example:
   * [
   *  [  A   A   A   A   G   A  ]
   *  [  T   C   G   T   T   C  ]
   *  [  C   C   A   T   G   G  ]
   *  [  C   C   T   A   C   G  ]
   *  [  C   T   C   T   T   G  ]
   *  [  A   C   C   C   T   G  ]
   * ]
   * A has a pattern in the horizontal direction.
   * G has a pattern in the vertical direction.
   * C has a pattern in the slash direction.
   * T has a pattern in the reverse slash direction.
   *
   * So this is a DNA with mutations because has 4 patterns.
   *
   * @returns {boolean}
   */
  hasMutation () {
    // Set processable sequence to process the mutation calculation
    this.setProcessableSequence()

    /**
     * This is 3 because we need to check if the next 3 characters
     * are equals to current character.
     */
    const MAX_ARRAY_TRANSVERSAL = 3

    /**
     * If the DNA has 2 patterns it has mutation
     */
    const DNA_PATTERN_MUTATION_QUANTITY = 2

    /**
     * DNA is a square array so that.
     */
    const dnaLength = this.processableSequence.length

    let dnaPatternCount = 0
    let hasMutation = false

    for (let rowIndex = 0; rowIndex < dnaLength; rowIndex++) {
      if (dnaPatternCount === DNA_PATTERN_MUTATION_QUANTITY) {
        hasMutation = true
        break
      }

      for (let columnIndex = 0; columnIndex < dnaLength; columnIndex++) {
        // First validate if can check horizontal patter for current index
        if (columnIndex + MAX_ARRAY_TRANSVERSAL < dnaLength &&
          this.#hasHorizontalPatternForIndexes(
            rowIndex,
            columnIndex
          )) {
          dnaPatternCount += 1
        }

        // First validate if can check vertical patter for current index
        if (rowIndex + MAX_ARRAY_TRANSVERSAL < dnaLength &&
          this.#hasVerticalPatternForIndexes(
            rowIndex,
            columnIndex
          )) {
          dnaPatternCount += 1
        }

        // First validate if can check slash patter for current index
        if (rowIndex + MAX_ARRAY_TRANSVERSAL < dnaLength &&
            columnIndex + MAX_ARRAY_TRANSVERSAL < dnaLength &&
            this.#hasSlashPatternForIndexes(
              rowIndex,
              columnIndex
            )) {
          dnaPatternCount += 1
        }

        // First validate if can check reverse slash patter for current index
        if (rowIndex + MAX_ARRAY_TRANSVERSAL < dnaLength &&
          this.#hasReverseSlashPatternForIndexes(
            rowIndex,
            columnIndex
          )) {
          dnaPatternCount += 1
        }
      }
    }
    return hasMutation
  }

  /**
   * Check if DNA sequence has pattern for the given indexes
   * of the sequence in the horizontal direction. By example:
   * [
   *  [ _A  *A  *A  *A   G   A  ]
   *  [  C   C   G   T   T   C  ]
   *  [  T   T   A   T   G   C  ]
   *  [  A   G   A   A   C   G  ]
   *  [  C   C   C   C   T   A  ]
   *  [  T   C   C   C   T   G  ]
   * ]
   * Checks for 0,0 index (_A) and compares with following three values
   * (*T, *G, *C). So returns true because all values are the same
   * otherwise returns false.
   *
   * @param {number} rowIndex
   * @param {number} columnIndex
   * @returns {boolean}
   */
  #hasHorizontalPatternForIndexes (rowIndex, columnIndex) {
    return (
      this.processableSequence[rowIndex][columnIndex] ===
        this.processableSequence[rowIndex][columnIndex + 1] &&
      this.processableSequence[rowIndex][columnIndex] ===
        this.processableSequence[rowIndex][columnIndex + 2] &&
      this.processableSequence[rowIndex][columnIndex] ===
        this.processableSequence[rowIndex][columnIndex + 3]
    )
  }

  /**
   * Check if DNA sequence has pattern for the given indexes
   * of the sequence in the vertical direction. By example:
   * [
   *  [ _A   T   G   C   G   A  ]
   *  [ *A   C   G   T   T   C  ]
   *  [ *A   T   A   T   G   C  ]
   *  [ *A   G   A   A   C   G  ]
   *  [  C   C   C   C   T   A  ]
   *  [  T   C   C   C   T   G  ]
   * ]
   * Checks for 0,0 index (_A) and compares with following three values
   * (*A, *A, *A). So returns true because all values are the same
   * otherwise returns false
   *
   * @param {number} rowIndex
   * @param {number} columnIndex
   * @returns {boolean}
   */
  #hasVerticalPatternForIndexes (rowIndex, columnIndex) {
    return (
      this.processableSequence[rowIndex][columnIndex] ===
        this.processableSequence[rowIndex + 1][columnIndex] &&
      this.processableSequence[rowIndex][columnIndex] ===
        this.processableSequence[rowIndex + 2][columnIndex] &&
      this.processableSequence[rowIndex][columnIndex] ===
        this.processableSequence[rowIndex + 3][columnIndex]
    )
  }

  /**
   * Check if DNA sequence has pattern for the given indexes
   * of the sequence in the slash direction. By example:
   * [
   *  [ _A   T   G   C   G   A  ]
   *  [  C  *A   G   T   T   C  ]
   *  [  T   T  *A   T   G   C  ]
   *  [  A   G   A  *A   C   G  ]
   *  [  C   C   C   C   T   A  ]
   *  [  T   C   C   C   T   G  ]
   * ]
   * Checks for 0,0 index (_A) and compares with following three values
   * (*A, *A, *A). So returns false because all values are not the same
   * otherwise returns true.
   *
   * @param {Array<Array<string>>} processableSequence
   * @param {number} rowIndex
   * @param {number} columnIndex
   * @returns {boolean}
   */
  #hasSlashPatternForIndexes (rowIndex, columnIndex) {
    return (
      this.processableSequence[rowIndex][columnIndex] ===
        this.processableSequence[rowIndex + 1][columnIndex + 1] &&
      this.processableSequence[rowIndex][columnIndex] ===
        this.processableSequence[rowIndex + 2][columnIndex + 2] &&
      this.processableSequence[rowIndex][columnIndex] ===
        this.processableSequence[rowIndex + 3][columnIndex + 3]
    )
  }

  /**
   * Check if DNA sequence has pattern for the given indexes
   * of the sequence in the reverse slash direction. By example:
   * [
   *  [  A   T   G  _A   G   A  ]
   *  [  C   C  *A   T   T   C  ]
   *  [  T  *A   A   T   G   C  ]
   *  [ *A   G   A   A   C   G  ]
   *  [  C   C   C   C   T   A  ]
   *  [  T   C   C   C   T   G  ]
   * ]
   * Checks for 0,0 index (_A) and compares with following three values
   * (*A, *A, *A). So returns true because all values are the same
   * otherwise returns false
   *
   * @param {Array<Array<string>>} processableSequence
   * @param {number} rowIndex
   * @param {number} columnIndex
   * @returns {boolean}
   */
  #hasReverseSlashPatternForIndexes (rowIndex, columnIndex) {
    return (
      this.processableSequence[rowIndex][columnIndex] ===
        this.processableSequence[rowIndex + 1][columnIndex - 1] &&
      this.processableSequence[rowIndex][columnIndex] ===
        this.processableSequence[rowIndex + 2][columnIndex - 2] &&
      this.processableSequence[rowIndex][columnIndex] ===
        this.processableSequence[rowIndex + 3][columnIndex - 3]
    )
  }
}

module.exports = DNA
