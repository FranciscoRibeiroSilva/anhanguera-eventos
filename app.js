/*if(process.env.NODE_ENV !== 'production'){
   app.use(morgan('dev'))
}*/

//Express
const express = require("express");
const app = express();

//Handlerbars
const handlebars = require('express-handlebars')

//BodyParser
const bodyParser = require('body-parser')

//Arquivos de rota
const adm = require('./routes/adm')
const user = require('./routes/user')

//Path
const path = require("path")

//Session
const session = require("express-session")

//Menssagens Flash
const flash = require("connect-flash")

//Modulo de Hash
const bcrypt = require("bcryptjs")

//Method override
//const methodOverride = require('method-override')
    //Autenticador de login
//const passport = require("passport")
    //require("./config/auth")(passport)

//Configurações
//Sessão
app.use(session({
        secret: "qualquer",
        resave: false,
        saveUninitialized: true
    }))
    /*app.use(passport.initialize())
    app.use(passport.session())*/
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

//Body Parse
//app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//css 
app.use(express.static(path.join(__dirname, "/public")));

//Rotas
//Rota principal
app.get('/', function(req, res) {
    res.render('index')
})

//Rotas dos adm's
app.use('/anhangueraeventos', adm)

//Rotas do usuario
app.use('/users', user)

//Outros
const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
    console.log("Servidor Rodando na URL http://localhost:8081");
});

//app.listen(process.env.PORT || 3000)