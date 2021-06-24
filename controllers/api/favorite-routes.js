const router = require('express').Router();
const {Favorite} = require('../../models/');

//IMPORT AUTHORIZATION FILE HERE
const { isLoggedIn, isLoggedOut } = require("../../utils/auth");


// CREATING A FAVORITE
// http://localhost:3001/api/favorite
router.post('/', isLoggedIn, (req,res) => {
    const newFavorite = Favorite.create({
      ...req.body, user_id: req.session.userId
    })
    res.json(newFavorite)
  
  .catch(err => {
    res.status(500).json(err)
  });
})


//WORK ON THIS ONCE ALL OF THE OTHER ROUTES ARE WORKING
//EDITING A FAVORITE
// http://localhost:3001/api/favorite/id
router.put('/:id', (req,res) => {
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
//http://localhost:3001/api/favorite/id
router.delete('/:id', isLoggedIn, (req,res) => {
  try {
    const [affectedRows] = Favorite.destroy(req.body, {
      where: {
        id: req.params.id,
      }
    })
  }
  catch(err){
    res.status(500).json(err)
  }
})


module.exports = router;