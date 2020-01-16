const Atividades = require('../models/Atividades')
const Eventos = require('../models/Eventos')

module.exports = {

    async createAtividade(req, res){
        const {evento_id} = req.params
        const {nome, data, hora_inicio, duracao, tipo_atividade, carga_horaria, vagas, paga, valor} = req.body
        const evento = await Eventos.findByPk(evento_id)
        if(!evento){
            req.flash('error_msg', 'Evento não encontrado')
        }

        const atividade = await Atividades.create({nome, data, tipo_atividade, paga, valor, evento_id})
        if(!atividade){
            req.flash('error_msg', 'Erro ao criar atividade')
        }
        req.flash('success_msg', 'Atividade adicionada')
        res.redirect('/gerenciar/atividades/'+evento_id)
    },
    async deleteAtividade(req, res){
        const {id} = req.params
        Atividades.destroy({where: {id}}).then(()=>{
            req.flash('success_msg', 'Atividade removido')
            res.redirect('/homepage')
        }).catch((err)=>{
            req.flash('error_msg', 'Erro ao atividade evento')
            res.redirect('/homepage')
        })
    },

}