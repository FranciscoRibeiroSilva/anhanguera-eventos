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

app.get("/", function(req, res){
    res.sendFile(__dirname + "/Management/index.html");
});

app.get("/cadastro", function(req, res)){
    
}

app.listen(8081, function(){
    console.log("Servidor Rodando na URL http://localhost:8081");
});
