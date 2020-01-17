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
            erros.push({ texto: " Email" })
            req.flash('error_msg', " Email")
        }
        if (!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null || req.body.senha.length < 7) {
            erros.push({ texto: " Senha" })
            req.flash('error_msg', " Senha")
        }
        if (erros.length <= 0) {
            return next()
        }
        res.redirect('/login')
    },
    verificaCadastroAdm(req, res, next) {
        var erros = []
        if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null || req.body.nome.length < 2) {
            erros.push({ texto: " Nome" })
            req.flash('error_msg', " Nome")
        }
        if (!req.body.email || typeof req.body.email == undefined || req.body.email == null || req.body.email.length < 8) {
            erros.push({ texto: " Email" })
            req.flash('error_msg', " Email")
        }
        if (!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null || req.body.senha.length < 7) {
            erros.push({ texto: " Senha" })
            req.flash('error_msg', " Senha")
        }
        if (req.body.estado == "N") {
            erros.push({ texto: " Estado" })
            req.flash('error_msg', " Estado")
        }
        if (erros.length <= 0) {
            return next()
        }
        res.redirect('/cadastroAdm')
    },
    verificaFormCupom(req, res, next) {
        var erros = []
        if (!req.body.codigo || typeof req.body.codigo == undefined || req.body.codigo == null || req.body.codigo < 4) {
            erros.push({ texto: " Código" })
            req.flash('error_msg', " Código")
        }

        if (req.body.desconto == "O") {
            erros.push({ texto: " Desconto" })
            req.flash('error_msg', " Desconto")
        }

        if (!req.body.quantidade || typeof req.body.quantidade == undefined || req.body.quantidade == null || req.body.quantidade < 1 ||  req.body.quantidade.length < 1) {
            erros.push({ texto: " Quantidade de Cupons" })
            req.flash('error_msg', " Quantidade de Cupons")
        }
        if (!req.body.validade || typeof req.body.validade == undefined || req.body.validade == null) {
            erros.push({ texto: " Data" })
            req.flash('error_msg', " Data")
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
            erros.push({ texto: " Nome da Atividade" })
            req.flash('error_msg', " Nome da Atividade")
        }
        if (!req.body.data ||
            typeof req.body.data == undefined ||
            req.body.data == null) {
            erros.push({ texto: " Data" })
            req.flash('error_msg', " Data")
        }

        if (req.body.tipo_atividade == "A") {
            erros.push({ texto: " Tipo da Atividade" })
            req.flash('error_msg', " Tipo da Atividade")
        }

        if (req.body.paga == "T") {
            erros.push({ texto: " Tipo de Inscrição" })
            req.flash('error_msg', " Tipo de Inscrição")
        }

        if (!req.body.vagas ||
            typeof req.body.vagas == undefined ||
            req.body.vagas == null ||
            req.body.vagas.length < 2) {
            erros.push({ texto: " Número de Participantes" })
            req.flash('error_msg', " Número de Participantes")
        }
        if (req.body.paga == 'true') {
            if (!req.body.valor ||
                typeof req.body.valor == undefined ||
                req.body.valor == null ||
                req.body.valor.length < 2) {
                erros.push({ texto: " Valor" })
                req.flash('error_msg', " Valor")
            }
        }

        if (erros.length <= 0) {
            return next()
        }
        res.redirect('/adicionar/atividades/' + evento.id)
    },

    verificaFormMinistrante(req, res, next){
        var erros = []
        if(!req.body.nome||typeof req.body.nome == undefined || req.body.nome == null || req.body.nome.length < 2){
            erros.push({texto: " Nome"})
            req.flash('error_msg', " Nome")
        }
        if(!req.body.contato|| typeof req.body.contato == undefined || req.body.contato == null || req.body.contato.length < 8){
            erros.push({texto: " Telefone"})
            req.flash('error_msg', " Telefone")
        }
        if(!req.body.email||typeof req.body.email == undefined || req.body.email == null || req.body.email.length < 8){
            erros.push({texto: " Email"})
            req.flash('error_msg', " Email")
        }
        if(!req.body.papel||typeof req.body.papel == undefined || req.body.papel == null || req.body.papel.length < 2){
            erros.push({texto: " Formação"})
            req.flash('error_msg', " Formação")
        }
        
        if(erros.length <=0){
            return next()
        }
        res.redirect('/adicionar/ministrantes/' + evento.id)
    },

    verificaFormEvento(req, res, next){
        var erros = []
        if(!req.body.nome||typeof req.body.nome == undefined || req.body.nome == null || req.body.nome.length < 3){
            erros.push({texto: " Nome do Evento"})
            req.flash('error_msg', " Nome do Evento")
        }
        if(!req.body.participantes_esperados|| typeof req.body.participantes_esperados == undefined || req.body.participantes_esperados == null || req.body.participantes_esperados.length < 1 || req.body.participantes_esperados<1){
            erros.push({texto: " Número de Participantes"})
            req.flash('error_msg', " Número de Participantes")
        }
        if(!req.body.quantidade_salas|| typeof req.body.quantidade_salas == undefined || req.body.quantidade_salas == null || req.body.quantidade_salas.length < 1 || req.body.quantidade_salas<1){
            erros.push({texto: " Quantidade de Salas"})
            req.flash('error_msg', " Quantidade de Salas")
        }
        if(!req.body.local_evento||typeof req.body.local_evento == undefined || req.body.local_evento == null || req.body.local_evento.length < 3){
            erros.push({texto: " Local do Evento"})
            req.flash('error_msg', " Local do Evento ")
        }
        if (!req.body.data_inicio || typeof req.body.data_inicio == undefined || req.body.data_inicio == null) {
            erros.push({ texto: " Data de Inicio" })
            req.flash('error_msg', " Data de Inicio")
        }
        if (!req.body.data_termino || typeof req.body.data_termino == undefined || req.body.data_termino == null) {
            erros.push({ texto: " Data de Termino" })
            req.flash('error_msg', " Data de Termino")
        }
        if (req.body.pago == "--Tipo--") {
            erros.push({ texto: " Selecione Gratuito ou Pago" })
            req.flash('error_msg', " Selecione Gratuito ou Pago")
        }
        /*if (req.body.pago == "Paga" & req.body.valor_evento <1) {
            erros.push({ texto: "Informe o valor do evento" })
            req.flash('error_msg', "Informe o valor do evento")
        }*/
        
        if(erros.length <=0){
            return next()
        }
        res.redirect('/adicionar/evento/' + evento.id)
    }
    /*verificAdm(nome, email, senha, estado){

        const adm = Administradores.findOne({where:{email: emailE}})

        if(!adm){
            return next()
        }
        res.render
    }*/
}