const db = require ('./db')

const Administrador = db.sequelize.define('administradores', {
    nome: {
         type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.STRING
    },
    senha: {
        type: db.Sequelize.STRING
    },
    estado: {
        type: db.Sequelize.STRING
    },
    
})

//Administrador.sync({force: true})

module.exports = Administrador