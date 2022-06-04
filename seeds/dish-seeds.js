
const { Dish } = require('../models')

const dishdata = [
  {
    dishName: 'Burger',
    user_id: 10,
  },
  {
    dishName: 'Chicken',

    user_id: 8,
  },
  {
    dishName: 'Beef',
    
    user_id: 1,
  },
  {
    dishName: 'Pork',
    user_id: 4,
  },
  
]

const seedDishes = () => Dish.bulkCreate(dishdata)

module.exports = seedDishes