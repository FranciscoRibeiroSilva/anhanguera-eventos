const Eventos = require('../models/Eventos')
const Usuario = require('../models/Usuarios')
const EventosUsuarios = require('../models/EventosUsuarios')

module.exports = {
    async createEvent(req, res){
        const {nome} = req.body
        const usuario_id = 1

        event = await Eventos.create({nome, usuario_id})

        return res.json(event)
    },
    async subscrevEvent(req, res){
        const evento_id = 1
        const administrador_id = 2

        const subs = await EventosUsuarios.create({evento_id, administrador_id})

        return res.json(subs)
        /*
        const event = await Eventos.findByPk(evento_id)
        if(!event){
            return res.send('sem evento')
        }

        const usuario = await Usuario.findByPk(usuario_id)
        if(!event){
            return res.send('sem usuario')
        }
        
        await event.addUsuarios(usuario)
        res.send('sucesso')
        */
    }
}