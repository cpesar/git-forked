<<<<<<< HEAD
const router = require('express').Router();
const {Favorite, User} = require('../../models/');
=======
const router = require("express").Router();
const { Favorite } = require("../../models/");
>>>>>>> feature/authentication

//IMPORT AUTHORIZATION FILE HERE
const { withAuth } = require("../../utils/auth");

// FIND ALL FAVORITES
//http://localhost:3001/favorites
<<<<<<< HEAD
router.get('/', hasAuth, (req,res) => {
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
=======
router.get("/", withAuth, (req, res) => {
  console.log("==============");
  Favorite.findAll()
    .then((newFavorite) => res.json(newFavorite))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
>>>>>>> feature/authentication
});

// CREATING A FAVORITE
<<<<<<< HEAD
// http://localhost:3001/api/favorites
router.post('/', hasAuth, (req,res) => {
  Favorite.create({
    user_id: req.session.user_id
  })
  .then(dbFavoriteData => res.json(dbFavoriteData))
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
=======
// http://localhost:3001/api/favorite
router.post("/", withAuth, (req, res) => {
  const newFavorite = Favorite.create({
    ...req.body,
    user_id: req.session.userId,
  });
  res
    .json(newFavorite)

    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
  //   const newFavorite = Favorite.create({
  //     ...req.body, user_id: req.session.userId
  //   })
  //   res.json(newFavorite)

  // .catch(err => {
  //   res.status(500).json(err)
  // });
>>>>>>> feature/authentication
});

// //WORK ON THIS ONCE ALL OF THE OTHER ROUTES ARE WORKING
// //EDITING A FAVORITE
<<<<<<< HEAD
// http://localhost:3001/api/favorites/id
// router.put('/:id', hasAuth, (req,res) => {
=======
// // http://localhost:3001/api/favorites/id
// router.put('/:id', withAuth, (req,res) => {
>>>>>>> feature/authentication
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
<<<<<<< HEAD
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
=======
    .then((dbFavoriteData) => {
      if (!dbFavoriteData) {
        res.status(404).json({ message: "No favorites found" });
        return;
      }
      res.json(dbFavoriteData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  // try {
  //   const [affectedRows] = Favorite.destroy(req.body, {
  //     where: {
  //       id: req.params.id,
  //     }
  //   })
  //   if(affectedRows > 0){
  //     res.status(200).end();
  //   }else{
  //     res.status(404).end();
  //   }
  // }
  // catch(err){
  //   res.status(500).json(err)
  // }
>>>>>>> feature/authentication
});

module.exports = router;
