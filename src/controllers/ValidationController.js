//const authenticConfig = require('../config/authentic')
const passport = require('passport')
const Administradores = require('../models/Administradores')
module.exports = {
    validSession(req, res, next) {
        passport.authenticate('local', {
            successRedirect: '/homepage',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next)
    },
    validSessionP(req, res, next) {
        passport.authenticate('local', {
            successRedirect: 'participante/homepage',
            failureRedirect: 'participante/login',
            failureFlash: true
        })(req, res, next)
    },

    verificaFormLogin(req, res, next) {
        var erros = []
        if (!req.body.email || typeof req.body.email == undefined || req.body.email == null || req.body.email.length < 8) {
            erros.push({ texto: "Email inválido" })
            req.flash('error_msg', "Email inválido ")
        }
        if (!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null || req.body.senha.length < 7) {
            erros.push({ texto: "Senha inválida" })
            req.flash('error_msg', "Senha inválido ")
        }
        if (erros.length <= 0) {
            return next()
        }
        res.redirect('/login')
    },
    verificaCadastroAdm(req, res, next) {
        var erros = []
        if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null || req.body.nome.length < 2) {
            erros.push({ texto: "Nome inválido" })
            req.flash('error_msg', "Nome inválido ")
        }
        if (!req.body.email || typeof req.body.email == undefined || req.body.email == null || req.body.email.length < 8) {
            erros.push({ texto: "Email inválido" })
            req.flash('error_msg', "Email inválido ")
        }
        if (!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null || req.body.senha.length < 7) {
            erros.push({ texto: "Senha inválida" })
            req.flash('error_msg', "Senha inválido ")
        }
        if (req.body.estado == "N") {
            erros.push({ texto: "Selecione um estado" })
            req.flash('error_msg', "Selecione um estado")
        }
        if (erros.length <= 0) {
            return next()
        }
        res.redirect('/cadastroAdm')
    },
    verificaFormCupom(req, res, next) {
        var erros = []
        if (!req.body.codigo || typeof req.body.codigo == undefined || req.body.codigo == null || req.body.codigo < 4) {
            erros.push({ texto: "Codigo inválido" })
            req.flash('error_msg', "Codigo inválido ")
        }

        if (req.body.desconto == "O") {
            erros.push({ texto: "Desconto inválido" })
            req.flash('error_msg', "Desconto inválido ")
        }

        if (!req.body.quantidade || typeof req.body.quantidade == undefined || req.body.quantidade == null || req.body.quantidade < 4) {
            erros.push({ texto: "Quantidade de cupons inválido" })
            req.flash('error_msg', "Quantidade de cupons inválido ")
        }
        if (!req.body.validade || typeof req.body.validade == undefined || req.body.validade == null) {
            erros.push({ texto: "Data inválida" })
            req.flash('error_msg', "Data inválid")
        }
        if (erros.length <= 0) {
            return next()
        }
        res.redirect('/adicionar/cupons/' + evento.id)
    },

    verificaFormAtividade(req, res, next) {
        var erros = []
        if (!req.body.nome ||
            typeof req.body.nome == undefined ||
            req.body.nome == null ||
            req.body.nome.length < 2) {
            erros.push({ texto: "Nome da atividade inválida" })
            req.flash('error_msg', "Nome da atividade inválida")
        }
        if (!req.body.data ||
            typeof req.body.data == undefined ||
            req.body.data == null) {
            erros.push({ texto: "Data inválida" })
            req.flash('error_msg', "Data inválido ")
        }

        if (req.body.tipo_atividade == "A") {
            erros.push({ texto: "Tipo da atividade inválida" })
            req.flash('error_msg', "Tipo da atividade inválida ")
        }

        if (req.body.paga == "T") {
            erros.push({ texto: "Tipo de inscrição inválida" })
            req.flash('error_msg', "Tipo de inscrição inválida ")
        }

        if (!req.body.vagas ||
            typeof req.body.vagas == undefined ||
            req.body.vagas == null ||
            req.body.vagas.length < 2) {
            erros.push({ texto: "Número de participantes inválido" })
            req.flash('error_msg', "Número de participantes inválido")
        }
        if (!req.body.valor ||
            typeof req.body.valor == undefined ||
            req.body.valor == null ||
            req.body.valor.length < 2) {
            erros.push({ texto: "Valor inválido" })
            req.flash('error_msg', "Valor inválido")
        }

        if (erros.length <= 0) {
            return next()
        }
        res.redirect('/adicionar/atividades/' + evento.id)
    }
    /*verificAdm(nome, email, senha, estado){

        const adm = Administradores.findOne({where:{email: emailE}})

        if(!adm){
            return next()
        }
        res.render
    }*/
}