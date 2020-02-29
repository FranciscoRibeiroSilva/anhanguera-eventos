const Atividades = require('../models/Atividades')

module.exports = {
    async createActivity(req, res){
        const {evento_id} = req.params

        const {nome, data, tipo_atividade, paga, valor} = req.body

        const atividade = await Atividades.create({nome, data, tipo_atividade, paga, valor, evento_id})

        return res.json(atividade)
    }
}