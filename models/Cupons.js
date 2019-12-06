const db = require ('./db')

const Cupons = db.sequelize.define('cupom', {
    codigo: {
         type: db.Sequelize.STRING
    },
    desconto: {
        type: db.Sequelize.STRING
    },
    quantidade: {
        type: db.Sequelize.STRING
    },
    validade: {
        type: db.Sequelize.STRING
    }
})

//Cupons.create({
//    codigo: "123ABC",
//    desconto: "0.7",
//    quantidade: "10"
//})

Cupons.sync({force: true})

module.exports = Cupons