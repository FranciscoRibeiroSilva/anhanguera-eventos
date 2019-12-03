const passport = require('passport')
const adm = require('../models/Administrador')
const localStrategy = require('passport-local').Strategy

module.exports = ()=>{
    passport.serializeUser((adm, done)=>{
        done(null, adm.id)
    })

    passport.deserializeUser((id, done)=>{
        Administrador.findByPk(id, (erro, adm)=>{
            console.log('aquii')
            done(erro, adm)
        })
    })

    passport.use(new localStrategy({usernameFielde : 'email', passwordField: 'senha'}, (email, senha, done)=>{
        Administrador.findOne({email : email}).then((adm)=>{
            if(!adm){
                console.log('email errada')
                return done(null, false, {messenge : "Essa conta não existe"})
            }
            else{
                bcrypt.compare(senha, adm.senha, (erro, batem)=>{
                    if (batem){
                        console.log('bate errada')
                        return done(null, adm)
                    }
                    else{
                        console.log('senha errada')
                        return done(null, false, {messenge: "Senha incorreta"})
                    }
            })
            }

            
        })
    }))

    
}

/*const user = require('../models/Administrador')
const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

function inicialize(passport, getUserByEmail, getUserById){
    const authenticaUser = async(email, senha, done) =>{
        if(user == null){
            return done(null, false, {message: 'E-mail inválido'})
        }

        try{
            if(await bcrypt.compare(senha, user.senha)){
                return done (null, user)
            }
            else{
                return done(null, false, {message: 'Senha inválida'})
            }
        }
        catch(err){
            return done(e)
        }
    }

    passport.use(new localStrategy({usernameField: 'email'}, authenticaUser))
    passport.serializeUser((user, done)=>done(null, user.id))
    passport.deserializeUser((id, done)=>{
        return done(null, getUserById(id))
    })
}

module.exports = inicialize

const localStrategy = require("passport-local").Strategy
const sequelize = require("sequelize")
const bcrypt = require("bcryptjs")
const Administrador = require("../models/Administrador")


module.exports = function(passport){
    passport.use(new localStrategy({usernameFielde : 'email', passwordField: 'senha'}, (email, senha, done)=>{
        Administrador.findOne({email : email}).then((adm)=>{
            if(!adm){
                console.log('email errada')
                return done(null, false, {messenge : "Essa conta não existe"})
            }
            else{
                bcrypt.compare(senha, adm.senha, (erro, batem)=>{
                    if (batem){
                        console.log('bate errada')
                        return done(null, adm)
                    }
                    else{
                        console.log('senha errada')
                        return done(null, false, {messenge: "Senha incorreta"})
                    }
            })
            }

            
        })
    }))

    passport.serializeUser((adm, done)=>{
        console.log('aquiissss')
        done(null, adm.id)
    })

    passport.deserializeUser((id, done)=>{
        Administrador.findById(id, (erro, adm)=>{
            console.log('aquii')
            done(erro, adm)
        })
    })
}*/