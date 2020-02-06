const Ministrantes = require('../models/Ministrantes')
const Eventos = require('../models/Eventos')

module.exports = {
    async createMinistrante(req, res) {
        const { evento_id } = req.params

        const { nome, contato, email, papel } = req.body
        console.log(nome, contato, email, papel)
        const evento = await Eventos.findByPk(evento_id)
        console.log(evento)
        
        if (!evento) {
            return res.send("error")
        }

        const ministrante = await Ministrantes.create({ nome, contato, email, papel, evento_id })
        res.redirect('/gerenciar/ministrantes')
    }
}