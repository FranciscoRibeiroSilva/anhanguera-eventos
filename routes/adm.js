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
    Cadastro.create({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        estado: req.body.estado
    }).then(function(){
        res.redirect('/anhangueraeventos/loginAdm')
    }).catch(function(erro){
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
        ministrante: req.body.ministrante,
        hora: req.body.hora,
        data: req.body.data,
        sala: req.body.sala,
        numeroDePartic: req.body.maxpar,
        cargaHoraria: req.body.ch,
        inscricaoT: req.body.inscricao,
        valor: req.body.valor,
        cupom: req.body.desconto
    }).then(function(){
        res.redirect('/anhangueraeventos/gerenciaDeAtividades')
    }).catch(function(erro){
        res.send("Erro ao adicionar atividade: "+erro)
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
