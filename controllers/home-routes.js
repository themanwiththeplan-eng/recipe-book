const sequelize = require('../config/connection')
const { Dish, User } = require('../models')
const router = require('express').Router()

router.get('/', (req, res) => {
  Dish.findAll({
    attributes: ['id', 'dishName', 'recipe', 'created_at'],
    include: [
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((dbPostData) => {
      const dishes = dbPostData.map((dish) => dish.get({ plain: true }))
      res.render('homepage', { dishes, loggedIn: req.session.loggedIn })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/')
    return
  }
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.get('/dish/:id', (req, res) => {
  Dish.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'dishName', 'recipe', 'created_at'],
    include: [
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No dish found with this id' })
        return
      }

      const dish = dbDishData.get({ plain: true })

      console.log(dish)
      res.render('single-dish', { dish, loggedIn: req.session.loggedIn })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

module.exports = router
