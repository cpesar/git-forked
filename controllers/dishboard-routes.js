const router = require('express').Router();
const sequelize = require('../config/connection');
const { Favorite } = require('../models');

const hasAuth = require('../utils/auth');


// const favoriteRoutes = require('./api/favorite-routes');


// //GET ALL FAVORITES
router.get('/', (req,res) => {

});



module.exports = router;