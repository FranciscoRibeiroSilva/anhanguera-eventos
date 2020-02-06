const Administradores = require('../models/Administradores')
const bcrypt = require('bcryptjs')
module.exports = {
    async createAdm(req, res){
        var {nome, email, senha, estado} = req.body

        //Gera hash da senha
        const hash = await bcrypt.hash(senha, 10);

        const adm = await Administradores.create({nome: nome, email: email, senha: hash, estado: estado});

        if(!adm){
            req.flash('error_msg', 'Erro ao criar administrador')
            res.render('admi/adminForms/FormAdm')
        }

        req.flash('success_msg', 'Cadastro concluído')
        res.redirect('/login')
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
    },
    
}