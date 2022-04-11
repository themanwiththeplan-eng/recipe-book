const express = require('express')
const router = express.Router()
const { Dish, User } = require('../models')
const withAuth = require('../routes/auth')

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/')
    return
  }
  res.render('login')
})

router.get('/', async (req, res) => {
  try {
    const dbDishData = await Dish.findall({
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
