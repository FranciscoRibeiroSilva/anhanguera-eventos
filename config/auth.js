const localStrategy = require("passport-local").Strategy
const sequelize = require("sequelize")
const bcrypt = require("bcryptjs")
const Administrador = require("../models/Administrador")


module.exports = function(passport){
    passport.use(new localStrategy({usernameFielde : 'email', passwordField: 'senha'}, (email, senha, done)=>{
        Administrador.findOne({email : email}).then((adm)=>{
            if(!adm){
                return done(null, false, {messenge : "Essa conta não existe"})
            }

            bcrypt.compare(senha, adm.senha, (erro, batem)=>{
                if (batem){
                    return done(null, adm)
                }
                else{
                    return done(null, false, {messenge: "Senha incorreta"})
                }
            })
        })
    }))

    passport.serializeUser((adm, done)=>{
        done(null, user.id)
    })

    passport.deserializeUser((id, done)=>{
        Administrador.findById(id, (erro, adm)=>{
            done(erro, adm)
        })
    })
}