const Ministrantes = require('../models/Ministrantes')
module.exports = {
    //Adicionar novo ministrante
    async createAcolyte(req, res){
        const {evento_id} = req.params

        const {nome, contato, email, papel} = req.body

        const ministrante = await Ministrantes.create({nome, contato, email, papel, evento_id})

        if(!ministrante){
            req.flash('error_msg', 'Erro ao resgistar ministrante')
        }
        
        req.flash('success_msg', 'Ministrante registrado')
        res.redirect('/gerenciar/ministrantes/'+evento_id)
    }
}