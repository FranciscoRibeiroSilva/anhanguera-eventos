const Eventos = require('../models/Eventos')
const Cupons = require('../models/Cupons')

module.exports = {
    async createCupons(req, res){
        const {evento_id} = req.params

        const {codigo, desconto, quantidade, validade} = req.body

        const evento = await Eventos.findByPk(evento_id)

        if(!evento){
            req.flash('error_msg', 'Erro evento não encontrado')
            res.redirect('/homepage')
        }

        const cupons = await Cupons.create({codigo, desconto, quantidade, validade, evento_id})
        if(!cupons){
            req.flash('error_msg',"Erro ao criar lote de cupons")
            res.redirect('/adicionar/cupons/'+evento_id)
        }
        req.flash('success_msg', 'Sucesso ao criar lote de cupons')
        res.redirect('/gerenciar/cupons/'+evento_id)
    }
}