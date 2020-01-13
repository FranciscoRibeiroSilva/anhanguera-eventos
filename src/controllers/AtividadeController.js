const Atividades = require('../models/Atividades')
const Eventos = require('../models/Eventos')

module.exports = {

    async createAtividade(req, res){
        const {evento_id} = req.params

        const {nome, data, hora_inicio, duracao, tipo_atividade, carga_horaria, vagas, paga, valor} = req.body
        console.log(nome, data, hora_inicio, duracao, tipo_atividade, carga_horaria, vagas, paga, valor)
        const evento = await Eventos.findByPk(evento_id)
        console.log(evento)

        if(!evento){
            return res.send('error')
        }

        const atividade = await Atividades.create({nome, data, tipo_atividade, paga, valor, evento_id})
        return res.json(atividade)
    }

}