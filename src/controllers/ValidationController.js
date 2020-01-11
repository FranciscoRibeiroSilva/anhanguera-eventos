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
    verificaFormLogin(req, res, next){
        var erros = []
        if(!req.body.email||typeof req.body.email == undefined || req.body.nome == null || req.body.nome.length < 8){
            erros.push({texto: "Email inválido"})
            req.flash('error_msg', "Email inválido ")
        }
        if(!req.body.senha|| typeof req.body.senha == undefined || req.body.senha == null || req.body.senha > 7){
            erros.push({texto: "Senha inválida"})
            req.flash('error_msg', "Senha inválido ")
        }
        if(erros.length <=0){
            return (req, res, next)
        }
        res.redirect('/login')
    }
    /*verificAdm(nome, email, senha, estado){

        const adm = Administradores.findOne({where:{email: emailE}})

        if(!adm){
            return next()
        }
        res.render
    }*/
}