const db = require ('./db')

const CadastroUsers = db.sequelize.define('usuarios', {
    nome: {
         type: db.Sequelize.STRING
    },
    cpf: {
        type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.STRING
    },
    senha:{
        type: db.Sequelize.STRING
    },
    formacao:{
        type: db.Sequelize.STRING
    }
    
})

//CadastroUsers.sync({force: true})

module.exports = CadastroUsers