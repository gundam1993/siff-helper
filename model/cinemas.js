/**
 * Created by gundam1993 on 18/03/18.
 */

const sequelize = require('./db').db
const Sequelize = require('sequelize')

const Cinema = sequelize.define('cinema', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, {
  timestamp: false,
  createdAt: false,
  updatedAt: false
})
module.exports = Cinema