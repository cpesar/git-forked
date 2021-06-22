//associations

//IMPORT MODELS
const Favorite = require('./Favorite');
const User = require('./User');


User.hasMany(Favorite, {
  foreignKey: 'user_id'
});

Favorite.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});



module.exports = {
  Favorite,
  User
};