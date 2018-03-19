const fs = require('fs')
const _ = require('lodash')
const moment = require('moment')
const Cinema = require('../model').Cinema
const Film = require('../model').Film
const Director = require('../model').Director
const FilmSession = require('../model').FilmSession

// var data = []
// let dir = fs.readdirSync('./dataSource/json')
// for (let i = 0; i < dir.length; i++) {
//   let filename = dir[i]
//   let file = fs.readFileSync(`./dataSource/json/${filename}`)
//   let chunk = JSON.parse(file.toString())
//   data = data.concat(chunk)
// }
// let lastList = []
// console.log(data[0])
// for (let i = 0; i < data.length; i++) {
//   let film = data[i].film
//   let filmKeys = Object.keys(film)
//   for (let j = 0; j < filmKeys.length; j++) {
//     let fss = film[filmKeys[j]]
//     fss.forEach(item => {
//       let lastF = Object.assign({}, item, {date: data[i].date, hall:filmKeys[j], cinema: data[i].cinema})
//       lastList.push(lastF)
//     })
//   }    
// }
// console.log(lastList)
// fs.writeFile('./dataSource/data.json', JSON.stringify(lastList), 'utf8', (err) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log('success')
//   }
// })

let data = JSON.parse(fs.readFileSync('./dataSource/data.json'))
console.log(data.length)

async function buildFilm (data) {
  for (let i = 0; i < data.length; i++) {
    let film = data[i]
    console.log(film)
    if (!film.film_name || !parseInt(film.film_total_time) ||!film.film_type_name) continue
    let existed = await Film.findOne({
      where: {
        name: film.film_name,
        time: parseInt(film.film_total_time),
      }
    })
    if (!existed) {
      let newFilm = await Film.create({
        name: film.film_name,
        time: parseInt(film.film_total_time),
        kind: film.film_type_name
      })
    }
  }
}
async function buildDirector (data) {
  let directors = []
  for (let i = 0; i < data.length; i++) {
    let film = data[i]
    let director = film.director
    if (!director) continue
    director = director.split('#')
    console.log(director)
    directors = directors.concat(director) 
  }
  console.log(directors.length)  
  directors = [...(new Set(directors))]
  console.log(directors)
  console.log(directors.length)
  directors = directors.map(name => {
    if (name) {
      return {
        name: name
      }
    }
    return false
  })
  console.log(directors.length)
  await Director.bulkCreate(directors)
}

async function buildSession (data) {
  for (let i = 0; i < data.length; i++) {
    let item = data[i]
    if (!item.film_name || !item.film_total_time) continue
    let session = {}
    console.log(item)
    let [film, cinema] = await Promise.all([
      Film.findOne({where: {name: item.film_name}}),
      Cinema.findOne({where: {name: item.cinema}})
    ])
    if (!film || !cinema) continue
    session.filmId = film.id
    session.cinemaId = cinema.id
    let time = moment(`${item.date} ${item.show_time}:00`).utc().format()
    console.log(time)
    session.time = time
    session.hall = item.hall
    await FilmSession.create(session)
  }
}

async function bindFilmDirector(data) {
  for (let i = 0; i < data.length; i++) {
    let item = data[i]
    console.log(item)
    if (!item.film_name) continue
    if (!item.film_total_time) continue
    let film = await Film.findOne({
      where: {
        name: item.film_name
      },
      include: [{
        model: Director,
        require: false
      }]
    })
    console.log(film.directors)
    if (film.directors.length) continue
    let directors =item.director.split('#')
    directors = directors.map(director => (director))
    directors = [...(new Set(directors))]
    let infos = await Director.findAll({where: {name: directors}})
    let bind = await film.addDirectors(infos)
  }
}
// buildFilm(data)
// buildDirector(data)
// buildSession(data)
bindFilmDirector(data)