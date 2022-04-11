const mongoose = require('mongoose')
const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')
const sequelize = require('../config/connection')
const dishes = require('./Dish')



class User extends Model{
    checkPassword(loginPw){
        return bcrypt.compareSync(loginPw, this.password)
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            references: {
                model: 'dishes',
                key: 'id'
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            },
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6],
            },
        },
    },
    {
        hooks: {
            beforeCreate(newUserData){
                newUserData.password = bcrypt.hash(newUserData.password, 10)
                return newUserData
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'users'
    }
)

User.hasMany(dishes);


module.exports = User;
