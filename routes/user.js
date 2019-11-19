const express = require("express")
const router2 = express.Router();
const CadastroUsers = require('../models/Usuarios')

router2.get('/geraCertificado', (req, res)=>{
    CadastroUsers.findAll().then(function(certis){
    res.render('Certificado', {certise: certis})
    })
})

module.exports = router2