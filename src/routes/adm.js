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

router.get('/testeTetas', PaginasController.testeTetas)

router.get('/cadastroAdm', PaginasController.formAdm)
router.post('/registUser', AdmController.createAdm)

router.get('/login', PaginasController.login)
router.post('/authen', ValidationController.validSession)

router.get('/homepage', PaginasController.homepage)
router.get('/adicionar/evento', PaginasController.formEvento)
router.post('/adicionar/evento/', EventoController.createEvento)

router.get('/gerenciar/evento/:id', PaginasController.gerenciaEvento)

router.get('/gerencia/atividades/:id', PaginasController.gerenciaAtividades)
router.get('/adicionar/atividade/:id', PaginasController.formAtividade)
router.post('/adicionar/atividade/:evento_id/', AtividadeController.createAtividade)

//router.get('/gerencia/ministrantes/:id_evento', PaginasController.gerenciaMinistrante)
//router.get('/adicionar/ministrante/:id_evento', PaginasController.formMinistrantes)
//router.post('/adicionar/ministrante/:id_evento/', PaginasController.formMinistrantes)

router.get('/gerenciar/cupons/:evento_id', PaginasController.gerenciaCupons)
router.get('/adicionar/cupons/:evento_id', PaginasController.formCupon)
router.post('/adicionar/cupons/:evento_id/', CuponsController.createCupons)



router.get('/gerenciar/usuarios/:evento_id', PaginasController.listaUsuarios)


router.get('/lista/adms', PaginasController.listaAdms)
router.get('/loginUser', PaginasController.loginUsuario)
router.get('/formUser', PaginasController.formParticipante)
router.post('/authen', ValidationController.validSession)

router.get('/editar/atividade', PaginasController.formModAtividade)
router.get('/sobreAnhanguera', PaginasController.sobre)
router.get('/logout', PaginasController.logoutAdm)


router.get('/listUser', AdmController.listAdm)
//router.get('/registUser/:administrado_id/listEvent', EventoController.listEvent)

router.post('/logar', AdmController.buscarUser)
router.post('/registEvento', EventoController.createEvento)

//router.post('/registUser/:administrado_id/:evento_id/createCupons', CuponsController.createCupon)
router.post('/registUser/:administrado_id/:evento_id/createMinistrante', MinistranteController.createMinistrante)
router.post('/registUser/:administrado_id/:evento_id/createParticipante', ParticipanteController.registParticipante)

module.exports = router