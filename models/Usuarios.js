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

//CadastroUsers.create({
//   nome: "Matheus Holanda",
//    cpf: "12345678900",
//    email: "matheus.lopes88@hotmail.com"
//})


//CadastroUsers.sync({force: true})

module.exports = CadastroUsers