const Administradores = require('../models/Administradores')
module.exports = {
    async createAdm(req, res){
        const {nome, email, senha, estado} = req.body

        const adm = await Administradores.create({nome, email, senha, estado});
    },
    async buscarUser(req, res){
        const email =  req.body.email

        const user = await Administradores.findOne({where: {email}})

        if(!user){
            req.flash("error_msg", "E-mail inválido")
            res.redirect('/login')
        }

        req.flash('success_msg', 'Bem-vindo!')
        res.redirect('/homepage')
        
    },
    async listAdm(req, res){
        const adms = await Administradores.findAll();

        return res.json(adms)
    }
}