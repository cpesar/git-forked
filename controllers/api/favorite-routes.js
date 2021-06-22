const router = require('express').Router();
const {FavoriteModel} = require('../../models/FavoriteModel');

//IMPORT AUTHORIZATION FILE HERE
const hasAuth = require('../../utils/auth');


//CREATING A FAVORITE
  //localhost:3001/api/favorite
router.post('/', (req,res) => {
    const newFavorite = FavoriteModel.create({
      ...req.body, userId: req.session.userId
    })
    res.json(newFavorite)
  
  .catch(err => {
    res.status(500).json(err)
  });
})


//WORK ON THIS ONCE ALL OF THE OTHER ROUTES ARE WORKING
//EDITING A FAVORITE
//localhost:3001/api/favorite/id
router.put('/:id', (req,res) => {
  try {
    const [affectedRows] = FavoriteModel.update(req.body, {
      where: {
        id: req.params.id,
      }
    })
    if(affectedRows > 0){
      res.status(200).end();
    } else {
      res.status(404).end();
  }
}
  catch(err) {
    res.status(500).json(err)
  };
})


//REMOVE A FAVORITE
//localhost:3001/api/favorite/id
router.delete('/:id', (req,res) => {
  try {
    const [affectedRows] = FavoriteModel.destroy(req.body, {
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