const express = require("express")
const router = express.Router()
const Cadastro = require('../models/Cadastro')
const Eventos = require('../models/Eventos')
const Atividades = require('../models/Atividades')

//pagina de cadastro do adm
router.get('/cadastroAdm', (req, res)=>{
    res.render('admi/adminForms/FormAdm')
})

//adiciona dados do cadastro adm ao BD
router.post('/addAdm',(req, res)=>{
    var erros =[]
    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null || req.body.nome.length < 2){
        erros.push({texto:"Insira um nome válido"})
    }
    if (!req.body.email || typeof req.body.email == undefined || req.body.email == null || req.body.email.length < 8){
        erros.push({texto:"Insira um e-mail válido"})
    }
    if (!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null || req.body.senha.length < 6){
        erros.push({texto:"Insira uma senha válida"})
    }
    if (erros.length > 0){
        res.render('admi/adminForms/FormAdm', {erros: erros})
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
    res.render('admi/LoginAdm')
})

//Verifica dados de login
router.post('/verificarDados',(req, res)=>{
    res.redirect('/anhangueraeventos/homepage')
})

//Pagina de formulario de criação de evento
router.get('/formEvento',(req, res)=>{
    res.render('admi/adminForm/FormEvento')
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
    res.render('admi/GerenciaDeEvento')
})

//pagina de gerenciamento de atividades
router.get('/gerenciaDeAtividades', (req, res)=>{
    
    Atividades.findAll().then(function(atividades){

        res.render('admi/gerenciaDeAtividades', {regist: atividades})
    })
})

//pagina de formulario de atividades
router.get('/formAtividades', (req, res)=>{
    res.render('admi/adminForms/FormAtividade')
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
        cargaHoraria: req.body.cargaHoraria,
        numeroDePartic: req.body.numeroDePartic,
        inscricaoT: req.body.inscricaoT,
        valor: req.body.valor,
        prazo: req.body.prazo,
        numConta: req.body.numConta,
        banco: req.body.banco,
        agencia: req.body.agencia,
        cpf: req.body.cpf
    }).then(function(){
        res.redirect('/anhangueraeventos/gerenciaDeAtividades')
    }).catch(function(err){
        req.flash("error_msg", "Erro ao adicionar atividade")
        res.redirect('/anhangueraeventos/gerenciaDeAtividades')
    })
})
//Exibe formulario de edeicao de atividades
router.get('/formModifica/:id',(req, res)=>{
    Atividades.findOne({where: {'id':req.params.id}}).then((atividades)=>{
        res.render('admi/adminForms/FormModAtividade', {atividades: atividades})
    }).catch((err)=>{
        req.flash("error_msg", "Erro ao busca atividade")
        res.redirect('anhangueraeventos/gerenciaDeAtividades')
    })
    
})

//Edita as atividades
router.post('/modAtividades/', (req, res)=>{
    Atividades.update({
        nome : req.body.nome,
        tipo: req.body.tipo,
        data: req.body.data,
        ministrante: req.body.ministrante,
        horaInicio: req.body.horaInicio,
        horaFinal: req.body.horaFinal,
        sala: req.body.sala,
        cargaHoraria: req.body.cargaHoraria,
        numeroDePartic: req.body.numeroDePartic,
        inscricaoT: req.body.inscricaoT,
        valor: req.body.valor,
        prazo: req.body.prazo,
        numConta: req.body.numConta,
        banco: req.body.banco,
        agencia: req.body.agencia,
        cpf: req.body.cpf
    },{where :{'id':req.body.id}}).then(()=>{
        req.flash("success_msg", "Edição concluida com exito")
        res.redirect('/anhangueraeventos/gerenciaDeAtividades')
    }).catch((err)=>{
        req.flash("error_msg","Erro ao editar atividade")
        res.redirect('anhagueraeventos/gerenciaDeAtividades')
    })
})

//remove atividades
router.get('/removeAtividade/:id', function(req, res){
    Atividades.destroy({where: {'id': req.params.id}}).then(function(){
        res.redirect('/anhangueraeventos/gerenciaDeAtividades')
    }).catch(function(erro){
        res.send("erro ao remover atividade: "+erro)
    })
})

module.exports = router
