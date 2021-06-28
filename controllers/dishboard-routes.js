//FRONT END ROUTES- NEED TO COLLAB WITH JIM FOR HANDLEBARS

const router = require("express").Router();
const sequelize = require("../config/connection");
const { Favorite, User } = require("../models");

const { withAuth } = require("../utils/auth");

const favoriteRoutes = require('./api/favorite-routes');

// //GET ALL FAVORITES

router.get("/",  withAuth, (req, res) => {
  res.render("dishboard", {
    title: "Dishboard",
    pageTitle: "Dishboard"
  });
});

router.get("/", withAuth, (req, res) => {
  Favorite.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes:
    [
      'id', 
      'cuisine', 
      'price', 
      'rating', 
      'created_at'
    ],
    include: [
      {model: User, attributes: ['username', 'password']}
    ]
  }).then(favoriteData => {
    const favorites = favoriteData.map(favorite=> favorite.get({plain: true}))
    //HANDLEBARS FILENAME GOES IN THE QUOTES
    res.render('favorite', { title: 'Favorites' }, {favorites, isLoggedIn: true})
  })
    .then((favoriteData) => {
      const favorites = favoriteData.map((favorite) =>
        favorite.get({ plain: true })
      );
      //talk to jim for handlebars for the class used in handlebars
      //reference for handlebars
      //HANDLEBARS FILENAME GOES IN THE QUOTES
      res.render(
        "favorite",
        { title: "Favorites" },
        { favorites, isLoggedIn: true }
      );
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;
