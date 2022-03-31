const express = require('express')
const passport = require('passport')
const router = express.Router()

// GET /auth/google  auth with google
router.get('/google', passport.authenticate('google', { scope: ['profile']}))

//GET /auth/google/callback  Google auth callback
router.get('/google/callback',   passport.authenticate('google', { failureRedirect: '/',}), (req, res) => {
    res.redirect('/dashboard')
})  

//route  /auth/logout
router.get('/logout', (req,res) => {
    req.logout()
    res.redirect('/')
})

module.exports = router