const router = require('express').Router();
const {Favorite} = require('../../models/');

//IMPORT AUTHORIZATION FILE HERE
const hasAuth = require('../../utils/auth');


//CREATING A FAVORITE
  //localhost:3001/api/favorite
router.post('/', hasAuth, (req,res) => {
    const newFavorite = Favorite.create({
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
router.put('/:id', hasAuth, (req,res) => {
  try {
    const [affectedRows] = Favorite.update(req.body, {
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
router.delete('/:id', hasAuth, (req,res) => {
  try {
    const [affectedRows] = Favorite.destroy(req.body, {
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