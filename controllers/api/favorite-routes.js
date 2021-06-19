
const router = require('express').Router();
const {favoriteModel} = require('../../models/favoriteModel');

//IMPORT AUTHORIZATION FILE HERE
const hasAuth = require('../../utils/auth')


//CREATING A FAVORITE
  //NEED MODEL INFO FROM PARKER!
router.post('/', hasAuth, (req,res) => {
  try {
    const newFavorite = favoriteModel.create({
      ...req.body, userId: req.session.userId
    })
    res.json(newFavorite)
  }
  catch(err){
    res.status(500).json(err)
  }
})

//EDITING A SELECTION
router.put('/:id', hasAuth, (req,res) => {
  try {
    const [affectedRows] = favoriteModel.update(req.body, {
      where: {
        id: req.params.id,
      }
    })
    if(affectedRows > 0){
      res.status(200).end();
    }else{
      res.status(404).end();
    }
  }
  catch(err){
    res.status(500).json(err)
  }
})


//DELETE A SELECTION
router.delete('/:id', hasAuth, (req,res) => {
  try {
    const [affectedRows] = favoriteModel.destroy(req.body, {
      where: {
        id: req.params.id,
      }
    })
    if(affectedRows > 0){
      res.status(200).end();
    }else{
      res.status(404).end();
    }
  }
  catch(err){
    res.status(500).json(err)
  }
})


module.exports = router;