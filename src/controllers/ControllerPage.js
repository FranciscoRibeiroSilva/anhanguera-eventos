const ControllerEvent = require('../controllers/ControllerEvent')
const ControllerUser = require('../controllers/ControllerUser')
module.exports = {
    login(req, res) {
        res.render('index')
    },
    formUser(req, res){
        res.render('users/forms/UserForm')
    },
    async homepage(req, res){
        const eventos = await ControllerUser.listEvents(req)
        res.render('users/homepage', {eventos})
    },
    formEvent(req,res){
        res.render('users/forms/EventForm')
    },
    async listAllEvents(req, res){
        const eventos = await ControllerEvent.listAllEvents()
        res.render('users/ListAllEvents', {eventos})
    },
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
    async formAcolyte(req, res){
        const {evento_id} = req.params

        const evento = await ControllerEvent.findEvent(evento_id)

        res.render('users/forms/AcolyteForm', {evento})
    }
}
//res.render('admi/adminForms/FormAdm')