//USER-LOGIN
const router = require('express').Router();
const {UserModel} = require('../../models/UserModel');


//localhost:3001/api/user
router.post('/homepage', (req,res) => {
  try{
    const newUser = UserModel.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
   //SAVES THE SESSION
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



//localhost:3001/api/user
router.post('/login', (req,res) => {
  try{
    const user = UserModel.findOne({
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




//localhost:3001/api/user
router.post('/logout', (req,res) => {
  if(req.session.loggedIn){
   //IF THE USER IS LOGGED IN, SAVE THE SESSION
    req.session.destroy(()=> {
      res.status(204).end()
    })
  }else{
    res.status(404).end()
  }
})


module.exports = router;