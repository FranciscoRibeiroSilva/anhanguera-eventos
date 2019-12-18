const Administrador = require('../models/administradores')

module.exports = {
    async inserirAdm(req, res){
        const {nome, email, senha, estado} = req.body

        const adm = await Administrador.create({nome, email, senha, estado})

        res.redirect('/anhangueraeventos/')
    }
}