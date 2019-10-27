const Sequelize = require('sequelize');

const sequelize = new Sequelize('manager', 'root', 'FRANCIeMAI123', {
    host: "localhost",
    dialect: 'mysql'
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}