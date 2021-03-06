const Cupons = require('../models/Cupons')
const ControllerEvent = require('../controllers/ControllerEvent')
module.exports = {
    async createCoupons(req, res){
        const {evento_id} = req.params

        const {codigo, desconto, quantidade, validade} = req.body

        const evento = await ControllerEvent.findEvent(evento_id)

        const cupons = await Cupons.create({codigo, desconto, quantidade, validade, evento_id})

        if(!cupons){
            req.flash('error_msg', 'Erro ao criar lote de cupons')
        }
        
        req.flash('success_msg', 'Cupons adicionados')
        res.redirect('/gerenciar/cupons/'+evento_id)
    }
}