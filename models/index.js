//associations

//IMPORT MODELS
const FavoriteModel = require('./FavoriteModel');
const UserModel = require('./UserModel');


UserModel.hasMany(FavoriteModel, {
  foreignKey: 'userId'
});

FavoriteModel.belongsTo(UserModel, {
  foreignKey: 'userId',
  onDelete: 'SET NULL'
});



module.exports = {
  FavoriteModel,
  UserModel
};