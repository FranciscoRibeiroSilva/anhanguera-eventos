const Administradores = require('../models/Administradores')
const jstoken  = require('jsonwebtoken')
const authenticConfig = require('../config/authentic')
const ValidationController = require('./ValidationController')

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
    }, 
    /*generateToken(params = {}){
        return jstoken.sign(params, authenticConfig.secret, {
            expiresIn: 86400,
        });
    },*/
    async autenticar(req, res){
        const {email, senha} = req.body

        const user = await Administradores.findOne({where: {email}})

        if (!user){
            return res.send('errou')
        }

        /*const token = jstoken.sign({id : user.id}, authenticConfig.secret, {
            expiresIn: 86400,
        }); */
        console.log(req)
        return res.redirect('/homepage')
        //return res.json({user, token: ValidationController.generateToken({id: user.id})})
    },
    
}