const Administradores = require('../models/Administradores')

module.exports = {
    async createAdm(req, res){
        const {nome, email, senha, estado} = req.body

        const adm = await Administradores.create({nome, email, senha, estado});

        return res.json(adm)
    },
    async listAdm(req, res){
        const adms = await Administradores.findAll();

        return res.json(adms)
    }
}