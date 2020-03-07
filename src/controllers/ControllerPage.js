const ControllerEvent = require('../controllers/ControllerEvent')
const ControllerUser = require('../controllers/ControllerUser')
const ControllerActivity = require('../controllers/ControllerActivity')
const Eventos = require('../models/Eventos')
module.exports = {
    //pagina de login
    login(req, res) {
        res.render('index')
    },
    //pagina de formulario de registro de usuario
    formUser(req, res){
        res.render('users/forms/UserForm')
    },
    //pagina de homepage
    async homepage(req, res){
        const eventos = await ControllerUser.listEvents(req)
        res.render('users/homepage', {eventos})
    },
    //pagina de formulario de criação de evento
    formEvent(req,res){
        res.render('users/forms/EventForm')
    },
    //pagina de com todos os eventos diponivéis
    async listAllEvents(req, res){
        const eventos = await ControllerEvent.listAllEvents()
        res.render('users/ListAllEvents', {eventos})
    },
    //pagina de eventos inscritos
    async subscreber(req, res){
        const eventos = await ControllerUser.registered(req)
        //return res.json(eventos)
        console.log(eventos)
        res.render('users/ListRegistred', {eventos})
    },
    //pagina de gerencia de evento
    async eventManager(req, res){
        const {id} = req.params
        const evento = await ControllerEvent.findEvent(id)
        res.render('users/eventManager', {evento})
    },
    //pagina de gerecia de ministrates do evento
    async acolyteManager(req, res){
        const {evento_id} = req.params

        const evento = await ControllerEvent.findAcolyte(evento_id)

        res.render('users/AcolyteManager', {evento})
    },
    //pagina do formulario de registro de ministrante
    async formAcolyte(req, res){
        const {evento_id} = req.params

        const evento = await ControllerEvent.findEvent(evento_id)

        res.render('users/forms/AcolyteForm', {evento})
    },
    //pagina de gerencia de atividades do evento
    async activityManager(req, res){
        const {evento_id} = req.params

        const evento = await ControllerEvent.findActivity(evento_id)
        //return res.json(evento.atividades)

        res.render('users/ActivityManager', {evento})
    },
    //pagina de formulario de criação de atividade de evento
    async formActivity(req, res){
        const {evento_id} = req.params

        const evento = await ControllerEvent.findAcolyte(evento_id)

        res.render('users/forms/ActivityForm', {evento})
    },
    //pagina que mostra atividades disponiveis pra inscrição
    async activitys(req, res){
        const {evento_id} = req.params

        const evento = await ControllerEvent.findActivity(evento_id)

        res.render('users/Activitys', {evento})
    },
    async find (req, res){
        const {evento_id} = req.params

        const evento = await Eventos.findByPk(evento_id, {
            include: {association: 'atividades'}
        })
        res.json(evento.atividades)
    }
}