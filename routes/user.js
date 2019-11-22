const express = require("express")
const router = express.Router();
const CadastroUsers = require('../models/Usuarios')
const Atividades = require('../models/Atividades')

router.get('/geraCertificado', (req, res)=>{
    CadastroUsers.findAll().then(function(certis){
    res.render('user/Certificado', {certise: certis})
    })
})

router.get('/formPartic', (req, res)=>{
    res.render('user/userForms/FormParticipante')
})

router.get('/certiAtiv', (req, res)=>{
    Atividades.findAll().then(function(ativis){
    res.render('user/CertificadoPorAtividade', {atividades: ativis})
})
})

//adiciona usuarios
router.post('/addUsuario', (req, res)=>{
    CadastroUsers.create({
        nome: req.body.nome,
        cpf: req.body.cpf,
        email: req.body.email,
        senha: req.body.senha
    }).then(function(){
        res.send('usuarios adicionado')
    }).catch(function(err){
        req.flash("error_msg", "Erro ao adicionar usuario")
        //res.redirect('/anhangueraeventos/gerenciaDeAtividades')
    })
})


module.exports = router