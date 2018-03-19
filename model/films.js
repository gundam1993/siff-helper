/**
 * Created by gundam1993 on 18/03/18.
 */

const sequelize = require('./db').db
const Sequelize = require('sequelize')

const Film = sequelize.define('film', {
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
  kind: {
    type: Sequelize.STRING,
    allowNull: false
  },
  time: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
}, {
  timestamp: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
module.exports = Film