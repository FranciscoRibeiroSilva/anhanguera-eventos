const express = require('express')
const router = express.Router()
const ParticipanteController = require('../controllers/ParticipanteController')
const PaginasController = require('../controllers/PaginasController')
const ValidationController = require('../controllers/ValidationController')

router.get('/participante/login', PaginasController.loginParticipante)
router.post('/participante/authen', ValidationController.validSessionP)

router.get('/participante/cadastro', PaginasController.formCadastroPartipante)
router.post('/participante/cadastro/', ParticipanteController.createParticipante)

router.get('/participante/homepage', PaginasController.participanteHomepage)

module.exports = router