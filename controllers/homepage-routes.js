//FRONT END ROUTES- NEED TO COLLAB WITH JIM FOR HANDLEBARS
const router = require('express').Router();
const sequelize = require('../config/connection');
const passport = require("passport");

const { User } = require('../models');
const homepageRoutes = require('./api/user-routes');

// router.use()
router.post("/login", passport.authenticate("local", {
  successRedirect: "/dishboard",
  failureRedirect: "/",
  failureFlash: true
}));

router.get('/login', (req,res)=> {
  if(req.session.loggedIn){
    res.redirect('/dishboard');
    return;
  }

  res.render('homepage', { title: 'Homepage' })
});


module.exports = router;