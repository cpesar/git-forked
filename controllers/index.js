//NAVIGATION ROUTES


const router = require('express').Router();

const dishboardRoutes = require('./dishboard-routes');
const homepageRoutes = require('./homepage-routes');
const api = require('./api');

router.use('/dishboard', dishboardRoutes);
router.use('/', homepageRoutes );
router.use('/api', api);


module.exports = router;