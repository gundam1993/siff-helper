/**
 * Created by gundam1993 on 18/03/19.
 */

const sequelize = require('./db').db
const Sequelize = require('sequelize')

const FilmsDirectors = sequelize.define('films_directors', {
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
  directorId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    field: 'director_id',
    references: {
      model: "director",
      key: "id"
    },
  }
}, {
  timestamp: false,
  createdAt: false,
  updatedAt: false
})
module.exports = FilmsDirectors