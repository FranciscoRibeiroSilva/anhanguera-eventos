const express = require("express")
const router = express.Router();
const CadastroUsers = require('../models/Usuarios')

router.get('/geraCertificado', (req, res)=>{
    CadastroUsers.findAll().then(function(certis){
    res.render('Certificado', {certise: certis})
    })
})

router.get('/formPartic', (req, res)=>{
    res.render('user/userForms/FormParticipante')
})

module.exports = router