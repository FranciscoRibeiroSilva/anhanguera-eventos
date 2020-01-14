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
router.post('/registUser',ValidationController.verificaCadastroAdm, AdmController.createAdm)

router.get('/login', PaginasController.login)
router.post('/authen', ValidationController.verificaFormLogin, ValidationController.validSession)

router.get('/homepage', PaginasController.homepage)
router.get('/adicionar/evento', PaginasController.formEvento)
router.post('/adicionar/evento/', EventoController.createEvento)

router.get('/gerenciar/evento/:id', PaginasController.gerenciaEvento)

router.get('/gerenciar/atividades/:evento_id', PaginasController.gerenciaAtividades)
router.get('/adicionar/atividades/:evento_id', PaginasController.formAtividade)
router.post('/adicionar/atividades/:evento_id/', AtividadeController.createAtividade)

router.get('/gerenciar/cupons/:evento_id', PaginasController.gerenciaCupons)
router.get('/adicionar/cupons/:evento_id', PaginasController.formCupons)
router.post('/adicionar/cupons/:evento_id/', CuponsController.createCupons)

router.get('/gerenciar/ministrantes/:evento_id', PaginasController.gerenciaMinistrante)
router.get('/adicionar/ministrantes/:evento_id', PaginasController.formMinistrantes)
router.post('/adicionar/ministrantes/:evento_id/', MinistranteController.createMinistrante)


router.get('/editar/atividade', PaginasController.formModAtividade)

router.get('/sobreAnhanguera', PaginasController.sobre)
router.get('/logout', PaginasController.logoutAdm)



module.exports = router