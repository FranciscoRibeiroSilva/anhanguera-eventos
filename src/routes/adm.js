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
router.get('/inicial', PaginasController.inicial)

router.get('/homepage', PaginasController.homepage)


router.get('/adicionar/evento', PaginasController.formEvento )
router.get('/adicionar/atividade', PaginasController.formModAtividade)
router.get('/adicionar/ministrante', PaginasController.formMinistrantes)
router.get('/adicionar/cupons', PaginasController.formCupon)
router.get('/editar/atividade', PaginasController.formModAtividade)
router.get('/gerencia/cupons', PaginasController.gerenciaCupons)
router.get('/gerencia/atividades', PaginasController.gerenciaAtividades)
router.get('/gerencia/eventos', PaginasController.gerenciaEventos)
router.get('/gerencia/ministrantes', PaginasController.gerenciaMinistrante)
router.get('/gerenciar/usuarios', PaginasController.listaUsuarios)
router.get('/sobreAnhanguera', PaginasController.sobre)
router.get('/logout', PaginasController.logoutAdm)

router.get('/loginUser', PaginasController.loginUsuario)

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