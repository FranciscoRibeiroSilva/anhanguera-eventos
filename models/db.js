const Sequelize = require('sequelize');

const sequelize = new Sequelize('administradores', 'root', 'FRANCIeMAI123', {
    host: "localhost",
    dialect: 'mysql'
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}