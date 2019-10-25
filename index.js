const express = require("express");
const app = express();

app.get("/", function(req, res){
    res.send("Teste: Okari na sai");
});

app.listen(8081, function(){
    console.log("Servidor Rodando na URL http://localhost:8081");
});
