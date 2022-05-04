
const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')
const sequelize = require('../config/connection')
const dishes = require('./Dish')

class User extends Model{
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            references: {
                model: 'dishes',
                key: 'id'
            }
        },
        username: {
            type: DataTypes.STRING,
            
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                len: [6],
            },
        },
    },
    
    {
        
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'users'
    }
)


module.exports = User;
