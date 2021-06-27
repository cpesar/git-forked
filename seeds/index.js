const seedFavorites = require('./favorite-seeds');
const seedUser = require('./user-seeds');

const sequelize = require('../config/connection');

const seedDb = async () => {
  await sequelize.sync({force: true});
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedUser();
  console.log('\n----- USER SEEDED -----\n');

  await seedFavorites();
  console.log('\n----- FAVORITE SEEDED -----\n');

  

  process.exit(0);
};

seedDb();