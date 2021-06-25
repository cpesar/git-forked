//FRONT END ROUTES- NEED TO COLLAB WITH JIM FOR HANDLEBARS

// router.use()

const router = require('express').Router();
const sequelize = require('../config/connection');

const { User } = require('../models');
const homepageRoutes = require('./api/user-routes');



router.get('/', (req,res)=> {
  if(req.session.loggedIn){
    res.redirect('/dishboard');
    return;
  }

  res.render('homepage', { title: 'Homepage' });
});


module.exports = router;