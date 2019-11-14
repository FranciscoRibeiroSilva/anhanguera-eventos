const Sequelize = require('sequelize');

const sequelize = new Sequelize('newevents', 'root', 'FRANCIeMAI123', {
    host: "localhost",
    dialect: 'mysql'
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}