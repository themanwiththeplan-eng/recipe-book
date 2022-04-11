const express = require('express')
const router = express.Router()

// GET landing page
router.get('/', (req, res) => {
  res.render('landing')
})

//Get dashboard page
router.get('/dashboard', (req, res, next) => {
  res.render('dashboard')
})

//Post login
router.post('/login', (req, res, next) => {
  res.json(req.body)
})

module.exports = router
