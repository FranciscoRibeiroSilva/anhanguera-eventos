const Atividades = require('../models/Atividades')
const AtividadesUsuarios = require('../models/AtividadesUsuarios')

module.exports = {
    async createActivity(req, res){
        const {evento_id} = req.params

        const {nome, data, tipo_atividade, paga, valor} = req.body

        const atividade = await Atividades.create({nome, data, tipo_atividade, paga, valor, evento_id})

        return res.json(atividade)
    },
    async subscreberActivity(req, res){
        const {atividade_id} = req.params
        const usuario_id = req.user.id

        const subs = await AtividadesUsuarios.create({atividade_id, usuario_id})

        return res.json(subs)
    }
}