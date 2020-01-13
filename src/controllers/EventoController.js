const Eventos = require('../models/Eventos')
const Administradores = require('../models/Administradores')

module.exports = {

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
    async seusMinistrantes(evento_id){
        const evento = await Eventos.findByPk(evento_id, {
            include: {association: 'seus_ministrantes'}
        })
        return evento
    },
    async seusCupons(evento_id){
        const evento = await Eventos.findByPk(evento_id, {
            include: {association: 'seus_cupons'}
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
    async createEvento(req, res){
         const administrado_id = req.user.id
         const {nome, participantes_esperados, quantidade_salas, local_evento, data_inicio, data_termino, pago, valor_evento} = req.body

         const adm = await Administradores.findByPk(administrado_id)

         if(!adm){
             return res.send("error")
         }

         const evento = await Eventos.create({nome, participantes_esperados, quantidade_salas, local_evento, data_inicio, data_termino, pago, valor_evento, administrado_id})
         
         if(!evento){
             req.flash("error_msg","error ao criar evento")
             res.redirect('/homepage')
         }

         req.flash('success_msg', 'Feito meu consagrado!')
         res.redirect('/homepage')
    }
}