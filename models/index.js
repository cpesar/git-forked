//associations

//IMPORT MODELS
const FavoriteModel = require('./FavoriteModel');
const UserModel = require('./UserModel');


UserModel.hasMany(FavoriteModel, {
  foreignKey: 'user_id'
});

FavoriteModel.belongsTo(UserModel, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});



module.exports = {
  FavoriteModel,
  UserModel
};