const Atividades = require('../models/Atividades')
const Eventos = require('../models/Eventos')

module.exports = {

    async registAtividade(req, res){
        
    },

    async createAtividade(req, res){
        const {evento_id} = req.params

        const {ministrante_id, nome, data, tipo_atividade, paga, valor} = req.body

        const evento = await Eventos.findByPk(evento_id)

        if(!evento){
            return res.send('error')
        }

        const atividade = await Atividades.create({ministrante_id, nome, data, tipo_atividade, paga, valor, evento_id})
        return res.json(atividade)
    }

}