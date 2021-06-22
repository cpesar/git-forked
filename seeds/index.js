const seedFavorites = require('./favorite-seed');
const seedUser = require('./user-seeds');
const sequelize = require('../config/connection');

const seedDb = () =>{
  sequelize.sync({
    force: true
  });
  seedUser()
  // console.log('db is syncing');
  seedFavorites()
  // console.log('db has seeded')
  process.exit(0)
}

seedDb();