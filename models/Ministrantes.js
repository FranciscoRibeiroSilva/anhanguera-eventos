const db = require ('./db')

const Ministrantes = db.sequelize.define('ministrantes', {
    nome: {
         type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.STRING
    },
    telefone: {
        type: db.Sequelize.STRING
    }
})

//Ministrantes.sync({force: true})

module.exports = Ministrantes