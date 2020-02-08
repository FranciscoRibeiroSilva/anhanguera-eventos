const localStrategy = require('passport-local')
const sequelize = require('sequelize')
const Usuarios = require('../models/Usuarios')
const bcrypt = require('bcryptjs')

module.exports  = function(passport){
    passport.use(new localStrategy({
        usernameField: 'email',
        passwordField: 'senha'
    },async(email, senha, done) =>{

        const usuario = await Usuarios.findOne({where:{email}})
        if(!usuario){
            return done(null, false, {message: 'Usuário não encotrado'})
        }

        bcrypt.compare(senha, usuario.senha, (erro, batem) => {
            if(batem){
                return done(null, usuario)
            }
            else{
                return done(null, false, {message: 'Senha incorreta'})
            }
        })
        /*if(senha == usuario.senha){
            return done(null, usuario)
        }
        else{
            return done(null, false, {message: 'senhas não batem'})
        }*/
    }))

    passport.serializeUser((usuario, done)=>{
        done(null, usuario.id)
    })

    passport.deserializeUser(async(id, done)=>{
        await Usuarios.findByPk(id).then((usuario)=>{
            done(null,usuario)
        }), function(error){
            done(err,null)
        }
    })
}