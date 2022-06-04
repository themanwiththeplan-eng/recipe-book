const express = require('express')
const routes = require('./controllers')
const sequelize = require('./config/connection')
const path = require('path')
const dotenv = require('dotenv')
const exphbs = require('express-handlebars')
const helpers = require('./utils/helpers')
const hbs = exphbs.create({ helpers })

const session = require('express-session')
const app = express()
const PORT = process.env.PORT || 3001

const SequelizeStore = require('connect-session-sequelize')(session.Store)

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
}

app.use(session(sess))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

//load config
dotenv.config({ path: './.env' })

//express handlebars
app.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', '.hbs')

app.use(routes)

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'))
})
