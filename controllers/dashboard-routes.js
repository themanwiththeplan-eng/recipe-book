const router = require('express').Router()
const sequelize = require('../config/connection')
const { Dish, User } = require('../models')
const withAuth = require('../utils/auth')

router.get('/', withAuth, (req, res) => {
  Post.findAll({
    where: {
      // use the ID from the session
      user_id: req.session.user_id,
    },
    attributes: ['id', 'dishName', 'recipe', 'created_at'],
    include: [
      
      {
        model: User,
        attributes: ['username'],
      }
    ],
  })
    .then((dbPostData) => {
      // serialize data before passing to template
      const posts = dbPostData.map((post) => post.get({ plain: true }))
      res.render('dashboard', { posts, loggedIn: true })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

router.get('/edit/:id', withAuth, (req, res) => {
  Post.findOne({
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
      const post = dbPostData.get({ plain: true })
      res.render('edit-dish', { post, loggedIn: true })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

router.get('/new', (req, res) => {
  res.render('new-dish')
})

module.exports = router