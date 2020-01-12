const Atividades = require('../models/Atividades')
const Eventos = require('../models/Eventos')

module.exports = {

    /*async listarAtividades(id){
        const evento = await Eventos.findByPk(id, {
            include: {association: 'suas_atividades'}
        })

        return evento.suas_atividades
    },*/

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