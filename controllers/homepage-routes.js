
const router = require('express').Router();
// const { UserModel } = require('../models/UserModel')
const homepageRoutes = require('./api/user-routes');

router.use()


router.get('/login', (req,res)=> {
  if(req.session.loggedIn){
    res.redirect('/dishboard');
    return;
  }

  res.render('/')
});


module.exports = router;