//const authenticConfig = require('../config/authentic')
const passport = require('passport')
const Administradores = require('../models/Administradores')
module.exports = {
    validSession(req, res, next){
        passport.authenticate('local', {
            successRedirect: '/homepage',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next)
    },
    validSessionP(req, res, next){
        passport.authenticate('local',{
            successRedirect: 'participante/homepage',
            failureRedirect: 'participante/login',
            failureFlash: true
        })(req, res, next)
    },

    verificaFormLogin(req, res, next){
        var erros = []
        if(!req.body.email||typeof req.body.email == undefined || req.body.email == null || req.body.email.length < 8){
            erros.push({texto: "Email inválido"})
            req.flash('error_msg', "Email inválido ")
        }
        if(!req.body.senha|| typeof req.body.senha == undefined || req.body.senha == null || req.body.senha.length < 7){
            erros.push({texto: "Senha inválida"})
            req.flash('error_msg', "Senha inválido ")
        }
        if(erros.length <=0){
            return next()
        }
        res.redirect('/login')
    },
    verificaCadastroAdm(req, res, next){
        var erros = []
        if(!req.body.nome||typeof req.body.nome == undefined || req.body.nome == null || req.body.nome.length < 2){
            erros.push({texto: "Nome inválido"})
            req.flash('error_msg', "Nome inválido ")
        }
        if(!req.body.email||typeof req.body.email == undefined || req.body.email == null || req.body.email.length < 8){
            erros.push({texto: "Email inválido"})
            req.flash('error_msg', "Email inválido ")
        }
        if(!req.body.senha|| typeof req.body.senha == undefined || req.body.senha == null || req.body.senha.length < 7){
            erros.push({texto: "Senha inválida"})
            req.flash('error_msg', "Senha inválido ")
        }
        if(req.body.estado == "N"){
            erros.push({texto: "Selecione um estado"})
            req.flash('error_msg', "Selecione um estado")
        }
        if(erros.length <=0){
            return next()
        }
        res.redirect('/cadastroAdm')
    }
    /*verificAdm(nome, email, senha, estado){

        const adm = Administradores.findOne({where:{email: emailE}})

        if(!adm){
            return next()
        }
        res.render
    }*/
}