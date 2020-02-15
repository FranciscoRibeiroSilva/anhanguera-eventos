const Usuarios = require('../models/Usuarios')
const Eventos = require('../models/Eventos')
const EventosUsuarios = require('../models/EventosUsuarios')
const bcrypt = require('bcryptjs')

module.exports = {

    //adiciona usuario
    async createUser(req, res){
        var {nome, email, senha} = req.body

        const user = await Usuarios.findOne({where:{email}})

        if(user){
            req.flash('error_msg', 'E-mail já utilizado')
            res.redirect('/adicionar/usuario')
        }

        senha = await bcrypt.hash(senha, 10)

        const usuario = await Usuarios.create({nome, email, senha})

        if(!usuario){
            req.flash('error_msg', 'Erro ao registrar usuário')
            res.redirect('/login')
        }

        req.flash('success_msg','Novo usuário registrado com sucesso')
        res.redirect('/login')
   },
   //lista os eventos adicionados pelo usuario
   async listEvents(req){
       const usuario_id = req.user.id

       const user = await Usuarios.findByPk(usuario_id,{
           include: {association: 'eventos'}
       })

       return user.eventos
       
   },
   //lista os eventos em que o usuario se inscreveu
   async registered(req){
       const usuario_id = req.user.id

       const eventos = await EventosUsuarios.findAll({where:{usuario_id}, include:{association: 'evento'}})
       return eventos
       /*const usuario = await Usuarios.findByPk(usuario_id,{
           include: {association: 'inscritoEm'}
       })

       return usuario*/
   }
   /*
   const administrado_id = req.user.id

        const adm = await Administradores.findByPk(administrado_id, {
            include: {association: 'seus_eventos'}
        })

        return adm.seus_eventos
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