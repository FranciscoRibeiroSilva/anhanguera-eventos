const express = require("express")
const router = express.Router()
const Administrador = require('../models/Administrador')
const Eventos = require('../models/Eventos')
const Atividades = require('../models/Atividades')
const Usuarios = require('../models/Usuarios')
const bcrypt = require("bcryptjs") 
//const passaport = require("passport")


//pagina de cadastro do adm
router.get('/cadastroAdm', (req, res)=>{
    res.render('admi/adminForms/FormAdm')
})

//adiciona dados do cadastro adm ao BD
router.post('/addAdm',(req, res)=>{
    var erros = []
    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null || req.body.nome.length < 2){
        erros.push({texto:"Insira um nome válido"})
    }
    if (!req.body.email || typeof req.body.email == undefined || req.body.email == null || req.body.email.length < 8){
        erros.push({texto:"Insira um e-mail válido"})
    }
    if (!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null || req.body.senha.length < 6){
        erros.push({texto:"Insira uma senha válida"})
    }
    if(req.body.senha != req.body.senha2){
        erros.push({texto:"As senhas informada direferem uma da outra!"})
    }
    if (erros.length > 0){
        res.render('admi/adminForms/FormAdm', {erros: erros})
    }
    else{
        Administrador.findOne({where: {email : req.body.email}}).then((adm)=>{
            if (adm){
                req.flash("error_msg", "E-mail já resgistrado na plataforma")
                res.redirect('/anhangueraeventos/cadastroAdm')
            }else{
                const temp = ({
                    senha: req.body.senha
                })

                bcrypt.genSalt(10, (erro, salt)=>{
                    bcrypt.hash(temp.senha, salt, (erro, hash) =>{
                        if(erro){
                            req.flash("error_msg", "Houve um erro durante o registro")
                            res.redirect("/")
                        }

                        Administrador.create({
                            nome: req.body.nome,
                            email: req.body.email,
                            senha: hash,
                            //senha: bcrypt.hash(req.body.senha, bcrypt.genSaltSync(10)),
                            estado: req.body.estado
                        }).then(function(){
                            req.flash("success_msg", "Administrador registrado")
                            res.redirect('/anhangueraeventos/loginAdm')
                        }).catch(function(erro){
                            req.flash("error_msg", "houve um erro ao cadastrar")
                            res.send("Erro na cria na criação do administrado: "+erro)
                        })

                    })
                })
            }
        }).catch((err)=>{
            req.flash("error_msg", "Erro no sistema!")
            res.redirect('/')
        })
    }
})

//Pagina de login do adm
router.get('/loginAdm', (req, res)=> {
    res.render('admi/LoginAdm')
})


//teste com passport
router.post('/sss', (req, res, next)=>{
    /*passaport.authenticate("local", {
        successRedirect: "/anhangueraeventos/homepage",
        failureRedirect: "/anhangueraeventos/loginAdm",
        failureFlash : true
    })(req, res, next)*/
})

//Verifica dados de login
router.post('/verificaLogin',(req, res)=>{
    Administrador.findOne({where:{email : req.body.email}}).then((adm)=>{
        console.log(adm)
        if(adm.email === req.body.email){
            res.redirect("/anhangueraeventos/homepage")
        }
        else{
            res.redirect("/")
        }
    }).catch((err)=>{
        console.log("oqueee")
        res.redirect("/anhangueraeventos/gerenciaDeEvento")
    })
    //res.redirect('/anhangueraeventos/homepage')
})

//Homepage adm que gerencia eventos
router.get('/homepage', (req, res)=>{
    Eventos.findAll().then(function(eventos){
        res.render('admi/homepage', {listEvent: eventos})
    })
})

//gerencia do evento unico
router.get('/gerenciaDeEvento', (req, res)=> {
    res.render('admi/gerenciaDeEvento')
})

//Pagina de formulario de criação de evento
router.get('/formEvento',(req, res)=>{
    res.render('admi/adminForms/FormEvento')
})

//Adiciona dados do formulario eventos ao DB
router.post('/addEvento', (req, res)=>{
    Eventos.create({
        nome: req.body.nome,
        participanteEs: req.body.participanteEs,
        tipoEvento: req.body.tipoEvento,
        nomeAdm: req.body.nomeAdm,
        emailAdm: req.body.emailAdm
    }).then(function(){
        res.redirect('/anhangueraeventos/homepage')
    }).catch(function(erro){
        res.send("Erro na criação do evento: "+erro)
    })

})

//pagina de gerenciamento de atividades
router.get('/gerenciaDeAtividades', (req, res)=>{
    
    Atividades.findAll().then(function(atividades){

        res.render('admi/gerenciaDeAtividades', {regist: atividades})
    })
})

// Página de usuários cadastrados
router.get('/listarUsuarios', (req, res)=>{
    Usuarios.findAll().then(function(usuarios){
        res.render('admi/listarUsuarios', {listarUsers: usuarios})
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
