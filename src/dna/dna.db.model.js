const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../database/database')

class DNA extends Model {}

DNA.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  sequence: {
    type: DataTypes.JSON,
    allowNull: false,
    get () {
      const storedValue = this.getDataValue('sequence')
      return JSON.parse(storedValue)
    },
    set (value) {
      this.setDataValue('sequence', JSON.stringify(value))
    }
  },
  hasMutation: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  sequelize, // We need to pass the connection instance
  modelName: 'DNA' // We need to choose the model name
})

module.exports = DNA
