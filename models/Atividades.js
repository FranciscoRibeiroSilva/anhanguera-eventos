const db = require('./db')

const Atividades = db.sequelize.define('ativids', {
    nome: {
        type: db.Sequelize.STRING
    },
    tipo: {
        type: db.Sequelize.STRING
    },
    ministrante: {
        type: db.Sequelize.STRING
    },
    hora: {
        type: db.Sequelize.STRING
    },
    data: {
        type: db.Sequelize.STRING
    },
    sala: {
        type: db.Sequelize.STRING
    },
    numeroDePartic: {
        type: db.Sequelize.STRING
    },
    cargaHoraria: {
        type: db.Sequelize.STRING
    },
    inscricaoT: {
        type: db.Sequelize.STRING
    }
})

//Atividades.sync({force: true})

module.exports = Atividades