 //USER MODEL
//IMPORT MODEL CLASS AND DataTypes FROM SEQUELIZE
const { Model, DataTypes } = require('sequelize');
const sequelize = require ('../config/connection');

//REQUIRE bcrypt FOR HASHING PASSWORDS
const bcrypt = require('bcrypt');

class userModel extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}
userModel.init(
{
  //1. DEFINE AN ID COLUMN
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
  //2. DEFINE A USERNAME COLUMN
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
  //3. DEFINE AN EMAIL COLUMN
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
  //4. DEFINE A PASSWORD COLUMN
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len: [6]
      }
    }
},
  
{
    hooks: {
      async beforeCreate(newUserData){
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      
      async beforeUpdate(updatedUserData){
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      } 
    },

    
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = userModel;