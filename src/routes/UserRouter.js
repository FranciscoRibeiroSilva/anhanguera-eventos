const express = require("express")
const router = express.Router()
const app = express()

const ControllerPage = require('../controllers/ControllerPage')
const ControllerUser = require('../controllers/ControllerUser')
const ControllerEvent = require('../controllers/ControllerEvent')
const ControllerAcolyte = require('../controllers/ControllerAcolyte')
const ControllerActivity = require('../controllers/ControllerActivity')
const ControllerCoupons = require('../controllers/ControllerCoupons')
const ControllerValidation = require('../controllers/ControllerValidation')
const {eAdmi} = require('../helpers/eAdmi')

//pagina de login
router.get('/login', ControllerPage.login)

//validacão de sessão logada
router.post('/authenticate', ControllerValidation.validationSession)

//pagina de formulario e rota post de criação de usuario
router.get('/adicionar/usuario', ControllerPage.formUser)
router.post('/adicionar/usuario/', ControllerUser.createUser)

//pagina home
router.get('/homepage', ControllerPage.homepage)

//pagina de formulario e rota post de criação de evento
router.get('/adicionar/evento', ControllerPage.formEvent)
router.post('/adicionar/evento/', ControllerEvent.createEvent)

//paginad e listagem de todos os eventos disponiveis na plataforma
router.get('/listar/eventos', ControllerPage.listAllEvents)

//rota post de inscrição em um evento
router.post('/inscrever/evento/:evento_id', ControllerEvent.subscrevEvent)

//rota post de inscrição em uma atividade
router.post('/inscrever/atividade/:atividade_id', ControllerActivity.subscreberActivity)

//pagina de listagem de inscrições
router.get('/listar/inscricoes', ControllerPage.subscreber)

//pagina de gerencia de evento
router.get('/gerenciar/evento/:id', ControllerPage.eventManager)

//exibição de pagina de gerencia, formulario e criação de ministrantes
router.get('/gerenciar/ministrantes/:evento_id', ControllerPage.acolyteManager)
router.get('/adicionar/ministrantes/:evento_id', ControllerPage.formAcolyte)
router.post('/adicionar/ministrantes/:evento_id/', ControllerAcolyte.createAcolyte)

//exibição de pagina de gerencia, formulario e criação de atividades
router.get('/gerenciar/atividades/:evento_id', ControllerPage.activityManager)
router.get('/adicionar/atividades/:evento_id', ControllerPage.formActivity)
router.post('/adicionar/atividades/:evento_id/', ControllerActivity.createActivity)

//exibição de pagina de gerencia, formulario e criação de cupons
router.get('/gerenciar/cupons/:evento_id', ControllerPage.couponsManager)
router.get('/adicionar/cupons/:evento_id', ControllerPage.formCoupons)
router.post('/adicionar/cupons/:evento_id/', ControllerCoupons.createCoupons)


router.get('/pagina/inscrito/evento/:evento_id', ControllerPage.activitys)

router.get('/find/eventos/atividades/:evento_id', ControllerPage.find)
/*
const AdmController = require('../controllers/AdmController')
const EventoController = require('../controllers/EventoController')
const CuponsController = require('../controllers/CuponsController')
const MinistranteController = require('../controllers/MinistranteController')
const ParticipanteController = require('../controllers/ParticipanteController')
const AtividadeController = require('../controllers/AtividadeController')
const PaginasController  = require('../controllers/PaginasController')


app.use(express.json)

router.get('/termos', PaginasController.termos)

--router.get('/cadastroAdm', PaginasController.formAdm)
router.post('/registUser',ValidationController.verificaCadastroAdm, AdmController.createAdm)


router.get('/participante/eventos', eAdmi, PaginasController.listaEventos)
router.post('/inscrever/evento/:evento_id', EventoController.inscreverEvento)

router.get('/homepage', eAdmi, PaginasController.homepage)
router.get('/adicionar/evento', eAdmi, PaginasController.formEvento)
router.post('/adicionar/evento/', eAdmi, ValidationController.verificaFormEvento, EventoController.createEvento)
router.get('/excluir/evento/:id', eAdmi, EventoController.deleteEvento)


router.get('/excluir/atividade/:id', eAdmi, AtividadeController.deleteAtividade)

router.get('/gerenciar/cupons/:evento_id', eAdmi, PaginasController.gerenciaCupons)
router.get('/adicionar/cupons/:evento_id', eAdmi, PaginasController.formCupons)
router.post('/adicionar/cupons/:evento_id/', eAdmi, ValidationController.verificaFormCupom, CuponsController.createCupons)



//router.get('/certificado/:atividade_id', PaginasController)

//router.get('/editar/atividade', PaginasController.formModAtividade)

//router.get('/sobreAnhanguera', PaginasController.sobre)
router.get('/logout', PaginasController.logoutAdm)
*/


module.exports = router