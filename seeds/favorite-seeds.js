const {Favorite} = require('../models');

const favoriteSeed = [
  {
    cuisine:'italian',
    price: 12,
    rating: 3.5,
    user_id: 3,

  },

  {
    cuisine:'pho',
    price: 20,
    rating: 10,
    user_id: 5,

  },
  
]

const seedFavorites = () => Favorite.bulkCreate(favoriteSeed);
module.exports = seedFavorites;