const express = require("express");
const app = express();
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const Cadastro = require('./models/Cadastro')
const Eventos = require('./models/Eventos')

//Configurando engine
    //Templete engine
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')

    //Body Parse configuração
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())

    //Conexão com banco de dados MySql

    

app.use(express.static('public'));

app.get("/", function(req, res){
    res.render('index')
});
app.get("/loginUser", function(req, res){
    res.render('LoginAdm')
})

app.get('/homepage', function(req, res){
    res.render('EventoCriado')
})

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

app.get("/cadastroUser", function(req, res){
    res.render('CadastroAdm')
})

app.get("/criarEvento", function(req, res){
    res.render('CriarEvento')
})

app.post("/inicio", function(req, res){
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

app.listen(8081, function(){
    console.log("Servidor Rodando na URL http://localhost:8081");
});
