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
    verificAdm(req, res, next){
        const {nome, email, senha, estado} = req.body

        const adm = Administradores.findOne({where:{email}})

        if(!adm){
            return(req, res, next())
        }
        res.render('admi/adminForms/FormAdm',{nome, email, senha, estado})
    }
}