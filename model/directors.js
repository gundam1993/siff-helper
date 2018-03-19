/**
 * Created by gundam1993 on 18/03/18.
 */

const sequelize = require('./db').db
const Sequelize = require('sequelize')

const Director = sequelize.define('director', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  }
}, {
  timestamp: false,
  createdAt: false,
  updatedAt: false
})
module.exports = Director