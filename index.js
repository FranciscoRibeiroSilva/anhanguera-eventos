const express = require("express");
const app = express();
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const adm = require('./routes/adm')
const Cadastro = require('./models/Cadastro')
const Eventos = require('./models/Eventos')
const Atividades = require('./models/Atividades')
const path = require("path")
const CadastroUsers = require('./models/Usuarios')

//Configurações
    //handlebars
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')

    //Body Parse
        app.use(bodyParser.urlencoded({extended: false}))
        app.use(bodyParser.json())

    //Css 
        app.use(express.static(path.join(__dirname, "public")));

//Rotas
    //Rota principal
        app.get('/', function(req, res){
              res.render('index')
            })
              //Certificado
            //    CadastroUsers.findAll().then(function(certis){
            //    res.render('Certificado', {certise: certis})
            //})
    
    //Rotas dos adm's
        app.use('/anhangueraeventos', adm)






//primeira pagina a ser exibida
/*app.get("/", function(req, res){
    res.render('index')
});

//pagina de login do adm
app.get("/loginUser", function(req, res){
    res.render('LoginAdm')
})

//pagina de cadastro de novo adm
app.get("/cadastroUser", function(req, res){
    res.render('CadastroAdm')
})

//adiciona os dados do adm ao banco de dados e redireciona ao formulario de cria evento
app.post("/criandoAdm", function(req, res){
    Cadastro.create({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        estado: req.body.estado
    }).then(function(){
        res.redirect('/criarEvento')
    }).catch(function(erro){
        res.send("Erro na cria na criação do administrado: "+erro)
    })
})

//exibe formulario para cria evento
app.get("/criarEvento", function(req, res){
    res.render('CriarEvento')
})

//adiciona os dados do evento na banco de dados e redireciona pra a homepage do adm
app.post("/registroDeEvento", function(req, res){
    Eventos.create({
        nome: req.body.nomeDoEvento,
        participanteEs: req.body.participantes,
        tipoEvento: req.body.tipoEvento
    }).then(function(){
        res.redirect('/homepage')
    }).catch(function(erro){
        res.send("Erro na criação do evento: "+erro)
    })
})

//exibe a homepage do adm
app.get('/homepage', function(req, res){
    res.render('EventoCriado')
})

//Pagina que lista e redireciona para o formulario de criar atividade
app.get('/gerenciarAtividades', function(req, res){
    Atividades.findAll().then(function(ativi){

        res.render('gerenciaDeAtividades', {regist: ativi})
    })
})

//Pagina de usuarios registrados
app.get('/usuariosRegistrados', function(req, res){
    res.render('usuariosCadastrados')
})

//Pagina de programação de evento
app.get('/programacao', function(req, res){
    res.render('programacao')
})

//pagina de formulario pra criacao de uma atividade
app.get("/adicionarAtividade", function(req, res){
    res.render('RegistraAtividade')
})

//adicona dados da atividade ao banco de dados e redireciona pra a homepage do adm
app.post("/addAtivi", function(req, res){
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
        res.redirect('/gerenciarAtividades')
    }).catch(function(erro){
        res.send("Erro ao adicionar atividade: "+erro)
    })
    
})

//remover atividade
app.get('/removeAtividade/:id', function(req, res){
    Atividades.destroy({where: {'id': req.params.id}}).then(function(){
        res.redirect('/gerenciarAtividades')
    }).catch(function(erro){
        res.send("erro ao remover atividade: "+erro)
    })
})*/

//Outros
const PORT = 8081
app.listen(PORT, ()=>{
    console.log("Servidor Rodando na URL http://localhost:8081");
});
