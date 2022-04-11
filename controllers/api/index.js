const router = require('express').Router()

const userRoutes = require('./user-routes')
const dishRoutes = require('./dish-routes')

router.use('/dishes', dishRoutes)
router.use('/users', userRoutes)

module.exports = router
