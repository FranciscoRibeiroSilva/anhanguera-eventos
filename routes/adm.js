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
        res.redirect('/anhangueraeventos/formEvento')
    }).catch((err)=>{
        console.log("erro "+err)
    })
})

//Pagina de login do adm
router.get('/loginAdm', (req, res)=> {
    res.render('LoginAdm')
})

//Pagina de formulario de criação de evento
router.get('/formEvento',(req, res)=>{
    res.render('CriarEvento')
})

//Adiciona dados do formulario eventos ao DB
router.post('/addEvento', (req, res)=>{
    const newEvento = {
        nome: req.body.nomeDoEvento,
        tipo: req.body.tipoEvento,
        participates: req.body.participantesEsper,
        nomeAdm: req.body.nomeAdministrador,
        emailAdm: req.body.emailAdministrador
    }

    new evento(newEvento).save().then(()=>{
        res.redirect('/anhangueraeventos/homepage')
    }).catch((err)=>{
        console.log("erro "+err)
    })
})
//homepage do adm
router.get('/homepage', (req, res)=> {
    res.render('EventoCriado')
})

//pagina de gerenciamento de atividades
router.get('/gerenciaDeAtividades', (req, res)=>{
    
    //atividade.findAll().then(function(atividades){
        res.render('gerenciaDeAtividades')
    //})
})

//pagina de formulario de atividades
router.get('/formAtividades', (req, res)=>{
    res.render('RegistraAtividade')
})

//rota que adiciona os dados de atividades ao DB
router.post('/addAtividade', (req, res)=>{
    const newAtividade = {
        nome: req.body.nome,
        tipo: req.body.tipo,
        responsavel: req.body.ministrante,
        hora: req.body.hora,
        data: req.body.data,
        sala: req.body.sala,
        numeroDePartic: req.body.maxpar,
        cargaHoraria: req.body.ch,
        tipoInscricao: req.body.inscricao,
        valor: req.body.valor,
        cupons: req.body.desconto
    }

    new atividade(newAtividade).save().then(()=>{
        res.redirect('/anhanguera/gerenciaDeAtividades')
    }).catch((err)=>{
        console.log('erro'+err)
    })
})

module.exports = router
