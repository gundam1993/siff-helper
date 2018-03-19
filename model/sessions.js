/**
 * Created by gundam1993 on 18/03/18.
 */

const sequelize = require('./db').db
const Sequelize = require('sequelize')

const FilmSession = sequelize.define('session', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  filmId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    field: 'film_id',
    references: {
      model: "film",
      key: "id"
    },
  },
  cinemaId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    field: 'cinema_id',
    references: {
      model: "cinema",
      key: "id"
    },
  },
  time: {
    type: Sequelize.DATE,
    allowNull: false
  },
  hall: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  timestamp: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
module.exports = FilmSession