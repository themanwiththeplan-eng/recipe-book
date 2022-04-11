const router = require('express').Router();
const userRoutes = ('./user-routes')
const dishRoutes = require('./dish-routes');

router.use('/dishes', dishRoutes)
router.use('/users', userRoutes)

module.exports = router;