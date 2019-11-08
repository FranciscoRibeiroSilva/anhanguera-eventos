const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Administradores')
require('../models/Evento')
require('../models/Atividade')
const administrador = mongoose.model("administradores")
const evento = mongoose.model("eventos")
const atividade = mongoose.model("atividades")

//pagina de cadastro do adm
router.get('/cadastroAdm', (req, res)=>{
    res.render('CadastroAdm')
})

//adiciona dados do cadastro adm ao BD
router.post('/addAdm',(req, res)=>{
    const newAdm ={
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        estado: req.body.estado
    }

    new administrador(newAdm).save().then(()=>{
        console.log("adicionado")
    }).catch((err)=>{
        console.log("erro "+err)
    })
})

//Pagina de login do adm
router.get('/loginAdm', (req, res)=> {
    res.render('LoginAdm')
})

//homepage do adm
router.get('/homepage', (req, res)=> {
    res.render('EventoCriado')
})

module.exports = router
