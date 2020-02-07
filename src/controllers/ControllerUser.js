const Usuarios = require('../models/Usuarios')

module.exports = {

    async createUsuario(req, res){

        const {nome, email, senha} = req.body

        const usuario = await Usuarios.create({nome, email, senha})

        return res.json(usuario)
   },
   /*
   async deleteEvento(req, res){
       const {id} = req.params
       Eventos.destroy({where: {id}}).then(()=>{
           req.flash('success_msg', 'Evento removido')
           res.redirect('/homepage')
       }).catch((err)=>{
           req.flash('error_msg', 'Erro ao remover evento')
           res.redirect('/homepage')
       })
   },

    async allEvento(){
        const evento = await Eventos.findAll()
        if(!evento){
            req.flash('error_msg', 'Sem eventos disponíveis')
        }
        return evento
    },
    async buscarEvento(id){
        const evento = await Eventos.findByPk(id)
        return evento
    },
    async suasAtividades(id){
        const evento = await Eventos.findByPk(id, {
            include: {association : 'suas_atividades'}
        })
        return evento
    },
    async seusCupons(evento_id){
        const evento = await Eventos.findByPk(evento_id, {
            include: {association: 'seus_cupons'}
        })
        return evento
    },
    async seusMinistrantes(evento_id){
        const evento = await Eventos.findByPk(evento_id, {
            include: {association : 'seus_ministrantes'}
        })
        return evento
    },
    async listEvent(req){
        const administrado_id = req.user.id

        const adm = await Administradores.findByPk(administrado_id, {
            include: {association: 'seus_eventos'}
        })

        return adm.seus_eventos
        //return res.json(adm.eventos) caso necessario exibir só os eventos
    },

    async inscreverEvento(req, res){
        const administrador_id = req.user.id
        const {evento_id} = req.params

        const evento = await Eventos.findByPk(evento_id)
        const administrador = await Administradores.findByPk(administrador_id)

        if(!administrador){
            req.flash('error_msg', 'ID de usuário inválido')
            res.redirect('/participante/eventos')
        }
        if(!evento){
            req.flash('error_msg', 'Evento não encontrado')
            res.redirect('/gerenciar/ministrantes/'+evento_id)
        }
        //await evento.addAdministradores(administrador)
        await administrador.addEventos(evento)
        res.send('ok')
    }*/
}