const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Dish extends Model {}

Dish.init(
      {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },

            dishName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            recipe: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            ingredients: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            country:{
                type: DataTypes.STRING,
                allowNull: false,
            }
        },

        {
            sequelize,
            freezeTableName: true,
            underscored: true,
            modelName: 'dish'
        }
    
)

module.exports = Dish;
