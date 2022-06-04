const User = require('./User')
const Dish = require('./Dish')

User.hasMany(Dish, {
  foreignKey: 'user_id',
})

Dish.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'cascade',
})

module.exports = { User, Dish }
