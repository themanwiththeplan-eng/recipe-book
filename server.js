const express = require('express')
const path = require('path')
const Router = require('./routes/index')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')

//load config
dotenv.config({ path: './.env' })

//passport config
require('./config/passport')(passport)


//Initialze app
const app = express()

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//Sessions and store account in MongoDB avoid kicked out
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
)

//express handlebars
app.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', '.hbs')

//routes
app.use('/', Router)

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

//logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 3001

app.listen(
  PORT,
  console.log(`Server is running in ${process.env.NODE_ENV} mode on ${PORT}`)
)
