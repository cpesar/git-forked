const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// const UserModel = require('./UserModel');

class Favorite extends Model {}
Favorite.init(
  {
    //  DEFINE ID COLUMN
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    
    //  DEFINE CUISINE COLUMN
    cuisine: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    //  DEFINE PRICE COLUMN
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      //VALIDATES IF IT IS A DECIMAL
      validate: {
        isDecimal: true
      }
    },

    //  DEFINE RATING COLUMN
    rating: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      //VALIDATES IF IT IS A DECIMAL
      validate: {
        isDecimal: true
      }
    },

    // DEFINE USER-ID COLUMN
    userId: {
      type: DataTypes.INTEGER,
      references:{
        model: 'User',
        key: 'id'
      }
    },

    // // DEFINE IMAGE URL
    // image_url: {
    //   type: DataTypes.STRING
    // },

    // // DEFINE IMAGE
    // image: {
    //   type: DataTypes.STRING
    // },

    // // DEFINE NAME
    // name: {
    //   type: DataTypes.STRING
    // }

  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'favorite'
  }
);

module.exports = Favorite;


