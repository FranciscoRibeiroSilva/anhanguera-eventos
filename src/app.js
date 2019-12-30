//Express
const express = require("express");
const app = express();

//Handlerbars
const handlebars = require('express-handlebars')

//BodyParser
const bodyParser = require('body-parser')

//Arquivos de rota
const adm = require('./routes/adm')
//const user = require('../routes/user')

//Path
const path = require("path")

//Session
const session = require("express-session")

//Menssagens Flash
const flash = require("connect-flash")

//Modulo de Hash
//const bcrypt = require("bcryptjs")

//Database
require('./database/index')

//Configurações
//Sessão
app.use(session({
        secret: "qualquer",
        resave: false,
        saveUninitialized: true
    })
)

app.use(flash())

//Midleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    res.locals.error = req.flash("error")
    next()
})

//handlebars
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//Body Parses
app.use(bodyParser.json())


//css 
app.use(express.static(path.join(__dirname, '../public')));

//Rotas dos adm's
app.use('/', adm)

//Rotas do usuario
//app.use('/users', user)

//Outros
const PORT = process.env.PORT || 8081  
app.listen(PORT, () => {
    console.log("Servidor Rodando na URL http://localhost:8081");
});