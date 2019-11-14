const db = require ('./db')

const Eventos = db.sequelize.define('eventos', {
    nome: {
        type: db.Sequelize.STRING
    },
    participanteEs: {
        type: db.Sequelize.STRING
    },
    tipoEvento: {
        type: db.Sequelize.STRING
    },
    nomeAdm:{
        type: db.Sequelize.STRING
    },
    emailAdm: {
        type: db.Sequelize.STRING
    }
})

//Eventos.sync({force: true})

module.exports = Eventos