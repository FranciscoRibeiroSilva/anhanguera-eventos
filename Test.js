const Sequelize = require('sequelize');
const sequelize = new Sequelize('sistemadecadastro', 'root', 'FRANCIeMAI123', {
    host: "localhost",
    dialect: 'mysql'
})

const Postagem  = sequelize.define('postagem', {
    titulo:{
        type: Sequelize.STRING
    },
    conteudo:{
        type: Sequelize.TEXT
    }
})

/*Postagem.create({
    titulo: "Um back end",
    conteudo : "Vejo os back end"
})*/

//Postagem.sync({force: true})
const Usuario = sequelize.define('usuarios', {
    nome: {
        type: Sequelize.STRING
    },
    sobrenome: {
        type: Sequelize.STRING
    },
    idade: {
        type: Sequelize.INTEGER
    },
    email: {
        type : Sequelize.STRING
    }
})

//Usuario.sync({force: true})