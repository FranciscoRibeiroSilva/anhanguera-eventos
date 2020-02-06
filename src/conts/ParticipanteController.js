const Participantes = require('../models/Participantes')
const Eventos = require('../models/Eventos')
const bcrypt = require('bcryptjs')

module.exports = {
    async createParticipante(req, res){

        const {nome, email, senha, papel} = req.body

        //gera hash da senha
        const hash = await bcrypt.hash(senha, 10);

        const participante = await Participantes.create({nome: nome, email: email, senha: hash, papel: papel})
        req.flash('success_msg', 'Conta de participante criada com sucesso')
        res.redirect('/participante/login')
    }
}