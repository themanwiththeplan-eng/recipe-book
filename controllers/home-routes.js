const express = require('express')
const res = require('express/lib/response')
const { model } = require('../config/connection')
const router = express.Router()
const { Dish, User } = require('../models')
const withAuth = require('../routes/auth')

router.get('/', (req, res) => {
    if(!req.session.loggedIn){
        res.render('landing')
        return
    }
    
})

router.get('/login', (req, res) => {
  if (!req.session.loggedIn) {
    res.render('login')
    return
  }
  
})

router.get('/register', (req, res) => {
    if (!req.session.loggedIn) {
        res.render('register')
        return
    }
    
})

router.get('/', async (req, res) => {
  try {
    const dbDishData = await Dish.findAll({
      include: [
        {
          model: Dish,
          attributes: ['dishName', 'ingredients', 'country'],
        },
      ],
    })
    const dishes = dbDishData.map((dish) => {
      dish.get({ plain: true })
    })
    res.render('homepage', {
      dishes,
      loggedIn: req.session.loggedIn,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

module.exports = router
