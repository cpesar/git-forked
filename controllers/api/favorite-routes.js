const router = require("express").Router();
const { Favorite } = require("../../models/");

//IMPORT AUTHORIZATION FILE HERE
const { withAuth } = require("../../utils/auth");

// FIND ALL FAVORITES
//http://localhost:3001/favorites
router.get("/", withAuth, (req, res) => {
  console.log("==============");
  Favorite.findAll()
    .then((newFavorite) => res.json(newFavorite))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// CREATING A FAVORITE
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
});

// //WORK ON THIS ONCE ALL OF THE OTHER ROUTES ARE WORKING
// //EDITING A FAVORITE
// // http://localhost:3001/api/favorites/id
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
});

module.exports = router;
