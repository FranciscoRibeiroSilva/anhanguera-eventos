const Administrador = require('../models/Administrador')

module.exports = {
    async store(req, res){
        const {nome, email, senha, estado} = req.body

        const adm = await Administrador.create({name, email, senha, estado})
    }
}