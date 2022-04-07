const router = require('express').Router();

const dishRoutes = require('./dish-routes');

router.use('/dishes', dishRoutes)

module.exports = router;