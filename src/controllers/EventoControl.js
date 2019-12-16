const Eventos = require('../models/eventos')
const Administrador = require('../models/administradores')

module.exports = {
    async inserirEvento(req, res){
        const {administradores_id} = req.params;
        const {nome, participante_es, tipo_evento, quant_salas, nome_adm, evento_tipo, valor_evento} = req.body;

        const administrador = await Administrador.findByPk(administradores_id);

        if(!administrador){
            return res.send('erro adm not found')
        }

        const eventos = await Eventos.create({
            nome,
            participante_es,
            tipo_evento,
            quant_salas,
            nome_adm,
            evento_tipo,
            valor_evento,
            administradores_id
        });

        return res.json(eventos);
    }
}