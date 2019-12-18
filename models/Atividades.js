const db = require ('./db')

const Atividades = db.sequelize.define('atividades', {
    nome: {
        type: db.Sequelize.STRING
    },
    tipo: {
        type: db.Sequelize.STRING
    },
    ministrante: {
        type: db.Sequelize.STRING
    },
    data: {
        type: db.Sequelize.STRING
    },
    horaInicio: {
        type: db.Sequelize.STRING
    },
    duracao: {
        type: db.Sequelize.STRING
    },
    sala: {
        type: db.Sequelize.STRING
    },
    cargaHoraria: {
        type: db.Sequelize.STRING
    },
    numeroDePartic: {
        type: db.Sequelize.STRING
    },
    inscricaoT: {
        type: db.Sequelize.STRING
    },
    valor: {
        type : db.Sequelize.STRING
    },
    prazo: {
        type: db.Sequelize.STRING
    },
    numConta: {
        type: db.Sequelize.STRING
    },
    banco: {
        type: db.Sequelize.STRING
    },
    agencia: {
        type: db.Sequelize.STRING
    },
    cpf: {
        type: db.Sequelize.STRING
    }
})

//Atividades.sync({force: true})

module.exports = Atividades