const express = require("express")
const router = express.Router()
const app = express()

const ControllerPage = require('../controllers/ControllerPage')
const ControllerUser = require('../controllers/ControllerUser')
const ControllerEvent = require('../controllers/ControllerEvent')


router.post('/adicionar/evento/', ControllerEvent.createEvent)
router.post('/inscrever/', ControllerEvent.subscrevEvent)

router.get('/login', ControllerPage.login)

router.get('/adicionar/usuario', ControllerPage.formUser)
router.post('/adicionar/usuario/', ControllerUser.createUser)


/*
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

router.get('/termos', PaginasController.termos)

--router.get('/cadastroAdm', PaginasController.formAdm)
router.post('/registUser',ValidationController.verificaCadastroAdm, AdmController.createAdm)

router.post('/authen', ValidationController.verificaFormLogin, ValidationController.validSession)

router.get('/participante/eventos', eAdmi, PaginasController.listaEventos)
router.post('/inscrever/evento/:evento_id', EventoController.inscreverEvento)

router.get('/homepage', eAdmi, PaginasController.homepage)
router.get('/adicionar/evento', eAdmi, PaginasController.formEvento)
router.post('/adicionar/evento/', eAdmi, ValidationController.verificaFormEvento, EventoController.createEvento)
router.get('/excluir/evento/:id', eAdmi, EventoController.deleteEvento)

router.get('/gerenciar/evento/:id', eAdmi, PaginasController.gerenciaEvento)

router.get('/gerenciar/atividades/:evento_id', eAdmi, PaginasController.gerenciaAtividades)
router.get('/adicionar/atividades/:evento_id', eAdmi, PaginasController.formAtividade)
router.post('/adicionar/atividades/:evento_id/', eAdmi, ValidationController.verificaFormAtividade, AtividadeController.createAtividade)
router.get('/excluir/atividade/:id', eAdmi, AtividadeController.deleteAtividade)

router.get('/gerenciar/cupons/:evento_id', eAdmi, PaginasController.gerenciaCupons)
router.get('/adicionar/cupons/:evento_id', eAdmi, PaginasController.formCupons)
router.post('/adicionar/cupons/:evento_id/', eAdmi, ValidationController.verificaFormCupom, CuponsController.createCupons)


router.get('/gerenciar/ministrantes/:evento_id', eAdmi, PaginasController.gerenciaMinistrante)
router.get('/adicionar/ministrantes/:evento_id', eAdmi, PaginasController.formMinistrantes)
router.post('/adicionar/ministrantes/:evento_id/', eAdmi, ValidationController.verificaFormMinistrante, MinistranteController.createMinistrante)

//router.get('/certificado/:atividade_id', PaginasController)

//router.get('/editar/atividade', PaginasController.formModAtividade)

//router.get('/sobreAnhanguera', PaginasController.sobre)
router.get('/logout', PaginasController.logoutAdm)
*/


module.exports = router