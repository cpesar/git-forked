const seedFavorites = require('./favorite-seeds');
const seedUser = require('./user-seeds');

const sequelize = require('../config/connection');

// const seedDb = () =>{
//   sequelize.sync({
//     force: true
//   });
//   seedUser()
//   // console.log('db is syncing');
//   seedFavorites()
//   // console.log('db has seeded')
//   process.exit(0)
// }

const seedDb = () => {
  sequelize.sync({force: true});
  console.log('\n----- DATABASE SYNCED -----\n');

  seedFavorites();
  console.log('\n----- FAVORITE SEEDED -----\n');

  seedUser();
  console.log('\n----- USER SEEDED -----\n');

  process.exit(0);
};

seedDb();