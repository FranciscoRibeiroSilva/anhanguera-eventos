const express = require("express");
const app = express();
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const adm = require('./routes/adm')
const user = require('./routes/user')
const path = require("path")
const session = require("express-session")
const flash = require("connect-flash")
const passaport = require("passport")
require("./config/auth")(passaport)

//Configurações
    //Sessão
        app.use(session({
            secret: "qualquer",
            resave: true,
            saveUninitialized: true
        }))
        app.use(passaport.initialize())
        app.use(passaport.session())
        app.use(flash())

    //Midleware
        app.use((req, res, next)=>{
            res.locals.success_msg = req.flash("success_msg")
            res.locals.error_msg = req.flash("error_msg")
            res.locals.error = req.flash("error")
            next()
        })
        
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
    
    //Rotas dos adm's
        app.use('/anhangueraeventos', adm)
    
    //Rotas do usuario
        app.use('/users', user)

//Outros
const PORT = 8081
app.listen(PORT, ()=>{
    console.log("Servidor Rodando na URL http://localhost:8081");
});
