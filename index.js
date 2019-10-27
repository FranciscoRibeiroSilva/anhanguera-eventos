const express = require("express");
const app = express();
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')

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
app.get("/cadastroUser", function(req, res){
    res.render('CadastroAdm')
})
app.post("/inicio", function(req, res){
    res.send("Seu nome:" + req.body.nome)
})

app.listen(8081, function(){
    console.log("Servidor Rodando na URL http://localhost:8081");
});
