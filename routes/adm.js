const express = require("express")
const router = express.Router()
const Cadastro = require('../models/Cadastro')
const Eventos = require('../models/Eventos')
const Atividades = require('../models/Atividades')

//pagina de cadastro do adm
router.get('/cadastroAdm', (req, res)=>{
    res.render('CadastroAdm')
})

//adiciona dados do cadastro adm ao BD
router.post('/addAdm',(req, res)=>{
    var erros =[]
    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null || req.body.nome.length < 2){
        erros.push({texto:"Nome Inválido"})
    }

    if (erros.length > 0){
        res.render('cadastroAdm', {erros: erros})
    }
    Cadastro.create({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        estado: req.body.estado
    }).then(function(){
        req.flash("success_msg", "Administrador registrado")
        res.redirect('/anhangueraeventos/loginAdm')
    }).catch(function(erro){
        req.flash("error_msg", "houve um erro ao cadastrar")
        res.send("Erro na cria na criação do administrado: "+erro)
    })
})

//Pagina de login do adm
router.get('/loginAdm', (req, res)=> {
    res.render('LoginAdm')
})

//Verifica dados de login
router.post('/verificarDados',(req, res)=>{
    res.redirect('/anhangueraeventos/homepage')
})

//Pagina de formulario de criação de evento
router.get('/formEvento',(req, res)=>{
    res.render('CriarEvento')
})

//Adiciona dados do formulario eventos ao DB
router.post('/addEvento', (req, res)=>{
    Eventos.create({
        nome: req.body.nomeDoEvento,
        participanteEs: req.body.participanteEsper,
        tipoEvento: req.body.tipoEvento,
        nomeAdm: req.body.nomeAdministrador,
        emailAdm: req.body.emailAdministrador
    }).then(function(){
        res.redirect('/homepage')
    }).catch(function(erro){
        res.send("Erro na criação do evento: "+erro)
    })

})

//homepage do adm
router.get('/homepage', (req, res)=> {
    res.render('EventoCriado')
})

//pagina de gerenciamento de atividades
router.get('/gerenciaDeAtividades', (req, res)=>{
    
    Atividades.findAll().then(function(atividades){

        res.render('gerenciaDeAtividades', {regist: atividades})
    })
})

//pagina de formulario de atividades
router.get('/formAtividades', (req, res)=>{
    res.render('RegistraAtividade')
})

//rota que adiciona os dados de atividades ao DB
router.post('/addAtividade', (req, res)=>{
    Atividades.create({
        nome: req.body.nome,
        tipo: req.body.tipo,
        data: req.body.data,
        ministrante: req.body.ministrante,
        horaInicio: req.body.horaInicio,
        horaFinal: req.body.horaFinal,
        sala: req.body.sala,
        cargaHoraria: req.body.ch,
        numeroDePartic: req.body.numeroDePartic,
        inscricaoT: req.body.inscricaoT,
        valor: req.body.valor,
        cupom: req.body.desconto,
        prazo: req.body.prazo,
        numConta: req.body.numConta,
        banco: req.body.banco,
        agencia: req.body.agencia,
        cpf: req.body.cpf
        

    }).then(function(){
        res.redirect('/anhangueraeventos/gerenciaDeAtividades')
    }).catch(function(erro){
        res.send("Erro ao adicionar atividade: "+erro)
    })
})

router.get('/formModifica/:id',(req, res)=>{
    Atividades.findOne({where: {'id':req.params.id}}).then((atividades)=>{
        res.render('modificarAtividade', {atividades: atividades})
    }).catch((err)=>{
        req.flash("error_msg", "Erro ao busca atividade")
        res.render('gerenciaDeAtividades')
    })
    
})

router.get('/removeAtividade/:id', function(req, res){
    Atividades.destroy({where: {'id': req.params.id}}).then(function(){
        res.redirect('/anhangueraeventos/gerenciaDeAtividades')
    }).catch(function(erro){
        res.send("erro ao remover atividade: "+erro)
    })
})

module.exports = router
