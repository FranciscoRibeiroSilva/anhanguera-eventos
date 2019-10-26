const express = require("express");
const app = express();

app.get("/", function(req, res){
    res.sendFile(__dirname + "/Management/index.html");
});

app.get ("/cast", function(req, res){
    res.sendFile(__dirname + "/Management/LoginAdm.html");
})

app.listen(8081, function(){
    console.log("Servidor Rodando na URL http://localhost:8081");
});
