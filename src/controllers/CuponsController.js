const Eventos = require('../models/Eventos')
const Cupons = require('../models/Cupons')

module.exports = {
    async createCupon(req, res){
        const {evento_id} = req.params

        const {codigo, desconto, quantidade, validade} = req.body

        const evento = await Eventos.findByPk(evento_id)

        if(!evento_id){
            return res.send("error")
        }

        const cupons = await Cupons.create({codigo, desconto, quantidade, validade, evento_id})
        return res.json(cupons)
    }
}