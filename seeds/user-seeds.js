

const {User} = require('../models');

const userSeed = [
  {
    username: 'charlie',
    email: 'charlie!@gmail.com',
    password: 'thisprojectisfunny'

  },

  {
    username: 'natedog',
    email: 'natedog@gmail.com',
    password: 'orioleswin'

  },
  
]

const seedUser = () => User.bulkCreate(userSeed);
module.exports = seedUser;