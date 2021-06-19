const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');
const UserModel = require('./UserModel');

class Favorite extends Model {}
Favorite.init(
  {
    //DEFINE COLUMNS
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    cuisine: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      //HOW TO VALIDATE IF THIS IS A DECIMAL
      validate: {
        isDecimal: true
      }
    },

    rating: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      //HOW TO VALIDATE IF THIS IS A DECIMAL
      validate: {
        isDecimal: true
      }
    },

    userId: {
      type: DataTypes.INTEGER,
      references:{
        model: 'UserModel',
        key: 'id'
      }
    },

    image_url: {
      type: DataTypes.STRING
    },

    image: {
      type: DataTypes.STRING
    },

    name: {
      type: DataTypes.STRING
    }

  }
);

module.exports = Favorite;


