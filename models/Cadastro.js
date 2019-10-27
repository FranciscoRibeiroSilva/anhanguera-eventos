const db = require ('./db')

const Cadastro = db.sequelize.define('gerentes', {
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
    }
})


//Cadastro.sync({force: true})

module.exports = Cadastro