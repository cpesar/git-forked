 //USER MODEL

const { Model, DataTypes } = require('sequelize');
const sequelize = require ('../config/connection');

//bcrypt HASHES PASSWORDS
const bcrypt = require('bcrypt');

class User extends Model {
  // CHECKS PASSWORD
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}



User.init(
{
  //1. ID COLUMN
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
  //2. USERNAME COLUMN
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
  //3. EMAIL COLUMN
    // email: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   unique: true,
    //   validate: {
    //     isEmail: true
    //   }
    // },
  //4. PASSWORD COLUMN
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
    modelName: 'user',
  }
);

module.exports = User;