const router = require('express').Router()
const { Dish, User } = require('../../models')
const sequelize = require('../../config/connection')
const withAuth = require('../../utils/auth')

// GET all dishes
router.get('/', (req, res) => {
  console.log('======================')
  Post.findAll({
    // Query configuration
    attributes: ['id', 'dishName', 'recipe', 'created_at'],
    order: [['created_at', 'DESC']],
    include: [
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((dbPostData) => res.json(dbPostData.reverse()))
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

// GET a single dish
router.get('/:id', (req, res) => {
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
      res.json(dbPostData)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

// creating a dish
router.post('/', withAuth, (req, res) => {
  // create 1 post
  Post.create({
    dishname: req.body.dishName,
    recipe: req.body.recipe,
    user_id: req.session.user_id,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

// update a dish
router.put('/:id', withAuth, (req, res) => {
  Post.update(
    {
      dishname: req.body.dishName,
      recipe: req.body.recipe,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No dish found with this id' })
        return
      }
      res.json(dbPostData)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

// delete a dish
router.delete('/:id', withAuth, (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No dish found with this id' })
        return
      }
      res.json(dbPostData)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

module.exports = router
