const Participantes = require('../models/Participantes')
const Eventos = require('../models/Eventos')

module.exports = {
    async registParticipante(req, res){
        const {evento_id} = req.params

        const {nome, email, senha, papel} = req.body

        const evento = await Eventos.findByPk(evento_id)

        if(!evento){
            return res.send("error")
        }

        const participante = await Participantes.create({nome, email, senha, papel, evento_id})
        return res.json(participante)
    }
}