const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')
const Router = require('./routes/index')
const sequelize = require('sequelize')
const routes = require('./controllers')




//load config
dotenv.config({ path: './.env'})

//passport config 
require('./config/passport')(passport)


//Initialze app
const app = express()

// Body parser
// app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//Sessions and store account in MongoDB avoid kicked out
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
app.use(passport.session())
//logging 
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Static folder
app.use(express.json())
app.unsubscribe(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

app.use(app.router);
routes.initialize(app)

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
   console.log('Now Listening')
  })
})

const PORT = process.env.PORT || 3001
 
app.listen(PORT, 
    console.log(`Server is running in ${process.env.NODE_ENV} mode on ${PORT}`))