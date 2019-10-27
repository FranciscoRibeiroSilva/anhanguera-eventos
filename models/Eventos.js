const db = require ('./db')

const Eventos = db.sequelize.define('events', {
    nome: {
        type: db.Sequelize.STRING
    },
    participanteEs: {
        type: db.Sequelize.STRING
    },
    tipoEvento: {
        type: db.Sequelize.STRING
    }
})

//Eventos.sync({force: true})