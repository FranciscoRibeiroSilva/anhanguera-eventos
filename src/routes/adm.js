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
const ValidationController = require('../controllers/ValidationController')
const {eAdmi} = require('../helpers/eAdmi')


app.use(express.json)

router.get('/login', PaginasController.login)
router.get('/cadastroAdm', PaginasController.formAdm)

router.get('/homepage', eAdmi, PaginasController.homepage)


router.get('/adicionar/evento', eAdmi, PaginasController.formEvento )
router.get('/adicionar/atividade', eAdmi, PaginasController.formModAtividade)
router.get('/adicionar/ministrante', eAdmi, PaginasController.formMinistrantes)
router.get('/adicionar/cupons', eAdmi, PaginasController.formCupon)
router.get('/editar/atividade', eAdmi, PaginasController.formModAtividade)
router.get('/gerencia/cupons', eAdmi, PaginasController.gerenciaCupons)
router.get('/gerencia/atividades', eAdmi, PaginasController.gerenciaAtividades)
router.get('/gerencia/eventos', eAdmi, PaginasController.gerenciaEventos)
router.get('/gerencia/ministrantes', eAdmi, PaginasController.gerenciaMinistrante)
router.get('/gerenciar/usuarios', eAdmi, PaginasController.listaUsuarios)
router.get('/sobreAnhanguera', PaginasController.sobre)
router.get('/logout', PaginasController.logoutAdm)

router.post('/authen', ValidationController.validSession)







router.get('/listUser', AdmController.listAdm)
router.get('/registUser/:administrado_id/listEvent', EventoController.listEvent)

router.post('/registUser', AdmController.createAdm)
router.post('/logar', AdmController.buscarUser)
router.post('/registEvento', EventoController.createEvento)

router.post('/registUser/:administrado_id/creatEvent', EventoController.createEvento)
router.post('/registUser/:administrado_id/:evento_id/createCupons', CuponsController.createCupon)
router.post('/registUser/:administrado_id/:evento_id/createMinistrante', MinistranteController.createMinistrante)
router.post('/registUser/:administrado_id/:evento_id/createParticipante', ParticipanteController.registParticipante)
router.post('/registUser/:administrado_id/:evento_id/createAtividade', AtividadeController.createAtividade)
router.post('/registUser/:administrado_id/:evento_id/registInAtivit', AtividadeController.registAtividade)

module.exports = router