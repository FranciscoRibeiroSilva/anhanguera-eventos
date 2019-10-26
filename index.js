const express = require("express");
const app = express();
const handlebars = require('express-handlebars')

//Configurando engine
    //Templete engine
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')

app.get("/", function(req, res){
    res.sendFile(__dirname + "/Management/index.html");
});

app.listen(8081, function(){
    console.log("Servidor Rodando na URL http://localhost:8081");
});
