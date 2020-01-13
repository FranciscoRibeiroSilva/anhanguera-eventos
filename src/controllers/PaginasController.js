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
    async cuponsGerecia(req, res){
        const {evento_id} = req.params
        const evento = await EventoController.seusCupons(evento_id)
        res.render('admi/gerenciaCupons',{evento})
    },
    async form2Cupon(req, res){
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
    
    
    async listaAdms(req, res){
        const adms = await Administradores.findAll()
        res.render('admi/listarAdms', { adms })
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
    formCupon(req, res) {
        res.render('admi/adminForms/FormCupons')
    },
    gerenciaCupons(req, res) {
        res.render('admi/gerenciaCupons')
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
    certificado(req, res) {
        res.render('user/Certificado')
    },
    certificadoPorAtividade(req, res) {
        res.render('user/CertificadoPorAtividade')
    },
    loginParticipante(req, res) {
        res.render('user/indexPar')
    },
    listarAtividades(req, res) {
        res.render('user/listaAtividades')
    },
    listaEventos(req, res) {
        res.render('user/listarEventos')
    },
    loginPar(req, res) {
        res.render('user/loginPar')
    },
    loginUsuario(req, res) {
        res.render('user/loginUsuario')
    },
    formParticipante(req, res) {
        res.render('user/userForms/FormParticipante')
    },

    //inicial
    inicial(req, res) {
        res.render('inicial')
    }

}