const express = require('express')
const router = express.Router()

// GET landing page
router.get('/', (req, res) => {
  res.render('landing')
})

//GET dashboard
router.get('/dashboard', (req, res) => {
  res.render('dashboard')
})

//Get login page
router.get('/login', (req, res) => {
  res.render('login')
})

//Get register page
router.get('/register', (req, res) => {
  res.render('register')
})

module.exports = router
