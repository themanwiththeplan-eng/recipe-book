const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Dish extends Model {}

Dish.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    dishName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recipe: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'dishes',
  }
)

module.exports = Dish
