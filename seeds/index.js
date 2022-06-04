const seedUsers = require('./user-seeds')
const seedDishes = require('./dish-seeds')

const sequelize = require('../config/connection')

const seedAll = async () => {
  await sequelize.sync({ force: true })
  console.log('------DATABASE SYNCED--------')
  await seedUsers()
  console.log('--------USERS SEEDED------')
  await seedDishes()
  console.log('-------DISHES SEEDED-------')

  process.exit(0)
}

seedAll()
