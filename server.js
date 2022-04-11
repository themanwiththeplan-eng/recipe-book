const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const sequelize = require('./config/connection')


//load config
dotenv.config({ path: './.env' })

//Initialze app
const app = express()

// Body parser
// app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

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
//express handlebars
app.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', '.hbs')

//routes

app.use(require('./controllers/'))

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

//logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}


const PORT = process.env.PORT || 3001
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'))
})
