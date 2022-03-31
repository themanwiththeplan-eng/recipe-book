const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')



//load config
dotenv.config({ path: './.env'})

//passport config (place under load config)
require('./config/passport')(passport)
//Initialze app
const app = express()

//Sessions 
app.use(session({ 
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  }))

//express handlebars
app.engine('.hbs', exphbs.engine ({ defaultLayout: 'main', extname: '.hbs',}))
app.set('view engine', '.hbs')

//passport middleware 
app.use(passport.initialize())
app.use(passport.session)

//logging 
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

//routes
app.use('/', require('./routes/index'))




const PORT = process.env.PORT || 3001
 
app.listen(PORT, 
    console.log(`Server is running in ${process.env.NODE_ENV} mode on ${PORT}`))