/**
 * Created by gundam1993 on 18/03/18.
 */

const config = require('config-lite')({
  config_basedir: __dirname,
  config_dir: 'config'
}).db
const Sequelize = require('sequelize')
console.log(config)
exports.db = new Sequelize(config.name, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
  storage: config.storage,
  pool: {
      max: 5,
      min: 0,
      idle: 10000
  }
})