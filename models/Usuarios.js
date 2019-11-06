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
    }
    
})


//Cadastro.sync({force: true})

module.exports = CadastroUsers