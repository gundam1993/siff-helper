/**
 * Created by gundam1993 on 18/03/18.
 */
const Film = require('./films')
const Cinema = require('./cinemas')
const Director = require('./directors')
const FilmSession = require('./sessions')
const FilmsDirectors = require('./filmsDirectors')

Film.hasMany(FilmSession)
FilmSession.belongsTo(Film)

Cinema.hasMany(FilmSession)
FilmSession.belongsTo(Cinema)

Film.belongsToMany(Director, { through: FilmsDirectors })
Director.belongsToMany(Film, { through: FilmsDirectors })

module.exports = {
  Film: Film,
  Cinema: Cinema,
  Director: Director,
  FilmSession: FilmSession
}
