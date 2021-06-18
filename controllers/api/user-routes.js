//User-Login
const router = require('express').Router();
const {userModel} = require('../../models/userModel');



router.post('/homepage', (req,res) => {
  try{
    const newUser = userModel.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
    //saves the session
    req.session.save(() =>{
      req.session.userId = newUser.id,
      req.session.email = newUser.email,
      req.session.password = newUser.password
    req.session.loggedIn = true,
    res.json(newUser)
    })
  }
  catch(err){
    res.status(500).json(err)
  }
});

router.post('/login', (req,res) => {
  try{
    const user = userModel.findOne({
      where:{
        username: req.body.username,
      }
    })
    const userPassword = user.checkPassword(req.body.password)

    if(!userPassword){
      res.status(400).json(err) 
      return;
    }
    req.session.save(() =>{
      req.session.userId = user.id,
      req.session.email = user.email,
      req.session.password = user.password
    req.session.loggedIn = true,
    res.json({user, message: 'User is now logged in!'})
    })
  }
    catch(err){
      res.status(400).json({message: 'User not found'})
    }
})


router.post('/logout', (req,res) => {
  if(req.session.loggedIn){
    //if the user is logged in, destroy the session
    req.session.destroy(()=> {
      res.status(204).end()
    })
  }else{
    res.status(404).end()
  }
})


module.exports = router;