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
        return res.json(eventos)
    }
}
//res.render('admi/adminForms/FormAdm')