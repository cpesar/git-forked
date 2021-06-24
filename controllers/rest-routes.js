

const router = require('express').Router();
const sequelize = require('../config/connection');

router.get('/', (req,res) => {
  if(req.session.loggedIn){
    res.render('restaurant', { title: 'Restaurant' })
  } 
})

module.exports = router;