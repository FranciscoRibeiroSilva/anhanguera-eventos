const Eventos = require('../models/Eventos')
const Administradores = require('../models/Administradores')

module.exports = {
    async listEvent(req, res){
        const {administrado_id} = req.params

        const adm = await Administradores.findByPk(administrado_id, {
            include: {association: 'administrador'}
        })

        return res.json(adm)
        //return res.json(adm.eventos) caso necessario exibir só os eventos
    },
    async createEvento(req, res){
         const {administrado_id} = req.params
         const {nome, participantes_esp, tipo_evento, quant_salas, pago, valor_evento} = req.body

         const adm = await Administradores.findByPk(administrado_id)

         if(!adm){
             return res.send("error")
         }

         const evento = await Eventos.create({nome, participantes_esp, tipo_evento, quant_salas, pago, valor_evento, administrado_id})
         return res.json(evento)
    }
}