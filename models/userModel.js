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
    //hooks (or lifecycle events), are functions that are called before or after calls in Sequelize
    hooks: {
      //ADD THE ASYNC FUNCTION TO THE hooks PROPERTY

              //----CREATE NEW USER PASSWORD-----
      //set up `beforeCreate` lifecycle 'hook' functionality
      async beforeCreate(newUserData){
                                                                //salt round 10
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      
              //----UPDATE USER PASSWORD--------
      //set up `beforeUpdate` lifecycle 'hook' functionality
      async beforeUpdate(updatedUserData){
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      } 
    },

    
    //TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))

    //PASS IN OUR IMPORTED SEQUELIZE CONNECTION (the direct connection to our database)
    sequelize,
    //DON'T AUTOMATICALLY CREATE createdAt/updatedAt timestamp fields
    timestamps: false,
    //DON'T PLURALIZE NAME OF DATABASE TABLE
    freezeTableName: true,
    //USE UNDERSCORES INSTEAD OF CAMEL-CASING
    underscored: true,
    //MAKE IT SO OUR MODEL NAME SAYS LOWERCASE IN THE DATABASE
    modelName: 'user'
  }
);

module.exports = userModel;