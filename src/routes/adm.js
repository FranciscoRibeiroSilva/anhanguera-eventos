const express = require("express")
const router = express.Router()
const app = express()
const AdmController = require('../controllers/AdmController')
const EventoController = require('../controllers/EventoController')
const CuponsController = require('../controllers/CuponsController')
const MinistranteController = require('../controllers/MinistranteController')
const ParticipanteController = require('../controllers/ParticipanteController')
const AtividadeController = require('../controllers/AtividadeController')
const PaginasController  = require('../controllers/PaginasController')

app.use(express.json)

router.get('/login', PaginasController.homepage)
router.get('/sobreAnhanguera', PaginasController.sobre)
router.get('/cadastroAdm', PaginasController.formAdm)

router.post('/registUser', AdmController.createAdm)
router.get('/listUser', AdmController.listAdm)
router.post('/registUser/:administrado_id/creatEvent', EventoController.createEvento)
router.get('/registUser/:administrado_id/listEvent', EventoController.listEvent)
router.post('/registUser/:administrado_id/:evento_id/createCupons', CuponsController.createCupon)
router.post('/registUser/:administrado_id/:evento_id/createMinistrante', MinistranteController.createMinistrante)
router.post('/registUser/:administrado_id/:evento_id/createParticipante', ParticipanteController.registParticipante)
router.post('/registUser/:administrado_id/:evento_id/createAtividade', AtividadeController.createAtividade)
router.post('/registUser/:administrado_id/:evento_id/registInAtivit', AtividadeController.registAtividade)

module.exports = router