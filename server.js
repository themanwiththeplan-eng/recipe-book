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
dotenv.config({ path: './config/config.env'})

//Initialze app
const app = express()

//passport config (place under load config)
require('./config/passport')(passport)


//Sessions (place above passport middleware)
app.use(session({ 
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  }))

  //passport middleware (place under handlebars)
app.use(passport.initialize())
app.use(passport.session)