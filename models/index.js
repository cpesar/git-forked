//associations

//IMPORT MODELS
const Favorite = require('./Favorite');
const UserModel = require('./UserModel');


UserModel.hasMany(Favorite, {
  foreignKey: 'user_id'
});

Favorite.belongsTo(UserModel, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});



module.exports = {
  Favorite,
  UserModel
};