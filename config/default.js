

module.exports = {
  port: 3000,
  dir: {
    dist: 'dist',
    static: 'static',
    index: 'dist/index.html'
  },
  db: {
    name: 'siff_dev',
    username: 'tianyao',
    password: '',
    host: 'localhost',
    dialect: 'sqlite',
    port: 5432,
    storage: './siff_dev.db'
  },
  session: {
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000*60*60 },
    redisStore: {host: '127.0.0.1', port: 6379, prefix:'chs-sess'},
    secret: 'test'
  },
}