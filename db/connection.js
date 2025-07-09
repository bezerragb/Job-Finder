const Sequelize = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    Storage: './dbapp.db'
});

module.exports = sequelize