const db = require('./db')
/* CRIANDO TABELA Eventos NO BANCO DE DADO*/
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
    quantSalas: {
        type: db.Sequelize.STRING
    },
    nomeAdm: {
        type: db.Sequelize.STRING
    },
    emailAdm: {
        type: db.Sequelize.STRING
    },
    local:{
        type: db.Sequelize.STRING
    },
    data:{
        type: db.Sequelize.STRING
    },
    eventoTipo: {
        type: db.Sequelize.STRING
    },
    valorEvento: {
        type: db.Sequelize.STRING
    }
})

//Eventos.sync({force: true})

module.exports = Eventos