const router = require('express').Router();
const {Favorite, User} = require('../../models/');

//IMPORT AUTHORIZATION FILE HERE
const { withAuth } = require("../../utils/auth");

// FIND ALL FAVORITES
//http://localhost:3001/favorites
router.get('/',(req,res) => {
  console.log('==============');
  Favorite.findAll({
    attributes: [
      'id', 
      'cuisine', 
      'price', 
      'rating', 
      'created_at'
    ],
    //INCLUDE FAVORITE MODEL
    include: [
      {
        model: Favorite,
        attributes: ['id', 'cuisine', 'price', 'rating', 'created_at'],
        include: {
          model: User,
          attributes: [ 'username' ]
        }
      },
      //JOIN THE TABLES
      {
        model:  User,
        attributes: [ 'username' ]
      }
    ]
  })
  .then(dbFavoriteData => res.json(dbFavoriteData))
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});

// CREATING A FAVORITE
// http://localhost:3001/api/favorites
router.post('/',(req,res) => {
  Favorite.create({
    // user_id: req.session.user_id
    cuisine: req.body.cuisine,
    price: req.body.price,
    rating: req.body.rating,
    user_id: req.session.user_id,
  })
  .then(dbFavoriteData => res.json(dbFavoriteData))
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});

// //WORK ON THIS ONCE ALL OF THE OTHER ROUTES ARE WORKING
// //EDITING A FAVORITE
// http://localhost:3001/api/favorites/id
// router.put('/:id', withAuth, (req,res) => {
//   try {
//     const [affectedRows] = Favorite.update(req.body, {
//       where: {
//         id: req.params.id,
//       }
//     })
//     if(affectedRows > 0){
//       res.status(200).end();
//     } else {
//       res.status(404).end();
//   }
// }
//   catch(err) {
//     res.status(500).json(err)
//   };
// })

//REMOVE A FAVORITE
//http://localhost:3001/api/favorites/<id>
router.delete("/:id", withAuth, (req, res) => {
  Favorite.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then(dbFavoriteData => {
    if(!dbFavoriteData){
      res.status(404).json({ message: 'No favorites found' });
      return;
    }
    res.json(dbFavoriteData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
