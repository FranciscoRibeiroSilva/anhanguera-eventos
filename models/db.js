const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: "ec2-107-21-255-181.compute-1.amazonaws.com",
    username: "njzlodwwxigbyx",
    password: "19df1b2b8ea8aaf7a5df356c188fb6dd0168c73bc23b825d85875435da411ae0",
    define:{
        timestamp:true
    },
    dialectOptions:{
        ssl:true
    },
    database:'d3pr69okcj3ggc'
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}