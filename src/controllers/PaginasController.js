const Administradores = require('../models/Administradores')
const EventoController = require('../controllers/EventoController')

module.exports = {

    testeTetas(req, res) {
        const id = req.user
        res.send(id)
    },
    //administradores
    formAdm(req, res) {
        res.render('admi/adminForms/FormAdm')
    },

    login(req, res) {
        res.render('index')
    },

    async homepage(req, res) {
        const adm = await EventoController.listEvent(req)
        res.render('admi/homepage', { adm })
    },

    formEvento(req, res) {
        res.render('admi/adminForms/FormEvento')
    },

    async gerenciaEvento(req, res) {
        const { id } = req.params
        const evento = await EventoController.buscarEvento(id)
        res.render('admi/gerenciaDeEvento', { evento })
    },

    async gerenciaAtividades(req, res) {

        const { evento_id } = req.params
        evento = await EventoController.suasAtividades(evento_id)
        res.render('admi/gerenciaDeAtividades', { evento })
    },

    async formAtividade(req, res) {
        const { evento_id } = req.params
        const evento = await EventoController.seusMinistrantes(evento_id)
        res.render('admi/adminForms/FormAtividade', {evento})
    },

    async gerenciaCupons(req, res){
        const {evento_id} = req.params
        const evento = await EventoController.seusCupons(evento_id)
        res.render('admi/gerenciaCupons',{evento})
    },
    async formCupons(req, res){
        const {evento_id} = req.params
        const evento = await EventoController.buscarEvento(evento_id)
        res.render('admi/adminForms/FormCupons',{evento})
    },
    async gerenciaMinistrante(req, res) {
        const { evento_id } = req.params
        const evento = await EventoController.seusMinistrantes(evento_id)
        res.render('admi/gerenciaMinistrantes', { evento })
    },
    async formMinistrantes(req, res) {
        const { evento_id } = req.params
        const evento = await EventoController.buscarEvento(evento_id)
        res.render('admi/adminForms/FormMinistrantes', { evento })
    },
    
    
    



    sobre(req, res) {
        res.render('admi/sobre')
    },


    formModAtividade(req, res){
        res.render('admi/adminForms/FormModAtividade')
    },

    formModAtividade(req, res) {
        res.render('admi/adminForms/FormModAtividade')
    },
    listaUsuarios(req, res) {
        res.render('admi/listarUsuarios')
    },
    logoutAdm(req, res) {
        req.logout()
        req.flash('error_msg', 'deslogado')
        res.redirect('/login')
    },

    //participantes
    async listaEventos(req, res){
        const evento = await EventoController.allEvento()
        res.render('admi/allEvento',{evento})
    },

    //inicial
    inicial(req, res) {
        res.render('inicial')
    }

}