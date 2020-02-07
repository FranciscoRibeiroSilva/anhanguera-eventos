//Express
const express = require("express");
const app = express();

//Handlerbars
const handlebars = require('express-handlebars')

//BodyParser
const bodyParser = require('body-parser')

//Arquivos de rota
const UserRouter = require('./routes/UserRouter')

//Path
const path = require("path")

//Session
const session = require("express-session")

//Menssagens Flash
const flash = require("connect-flash")
const passport = require('passport')
require('./config/authentic')(passport)

//Modulo de Hash
//const bcrypt = require("bcryptjs")

//Database
require('./database/index')

//Configurações
//Sessão
app.use(session({
        secret: "qualquersasdaa",
        resave: false,
        saveUninitialized: true
    })
)

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
//Midleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    res.locals.error = req.flash("error")
    res.locals.user = req.user || null
    //res.locals.idEvento = req.params.id_evento || null
    next()
})

//handlebars
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//Body Parses
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//css 
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.redirect('login')
})
//Rotas dos usuario
app.use(UserRouter)
 
//Definção de porta
const PORT = process.env.PORT || 8081 
app.listen(PORT, () => {
    console.log("Servidor Rodando na URL http://localhost:8081");
});