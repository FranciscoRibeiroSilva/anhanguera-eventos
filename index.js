const express = require("express");
const app = express();
const handlebars = require('express-handlebars')

//Configurando engine
    //Templete engine
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')

    //Conexão com banco de dados MySql
    const Sequelize = require('sequelize');
    const sequelize = new Sequelize('sistemadecadastro', 'root', 'FRANCIeMAI123', {
    host: "localhost",
    dialect: 'mysql'
})

app.use(express.static('public'));

app.get("/", function(req, res){
    res.render('indexT')
});
app.post("/cadastro", function(req, res){
    res.render('LoginAdm')
})
app.post("/usuario", function(req, res){
    res.render('')
})
app.post("/inicio", function(req, res){
    res.render('index')
})

app.listen(8081, function(){
    console.log("Servidor Rodando na URL http://localhost:8081");
});
