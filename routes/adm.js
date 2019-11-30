const express = require("express")
const router = express.Router()
const Administrador = require('../models/Administrador')
const Eventos = require('../models/Eventos')
const Atividades = require('../models/Atividades')
const Usuarios = require('../models/Usuarios')
const bcrypt = require("bcryptjs")
const passaport = require("passport")


//pagina de cadastro do adm
router.get('/cadastroAdm', (req, res) => {
    res.render('admi/adminForms/FormAdm')
})

//adiciona dados do cadastro adm ao BD
router.post('/addAdm', (req, res) => {
    var erros = []
    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null || req.body.nome.length < 2) {
        erros.push({ texto: "Insira um nome válido" })
    }
    if (!req.body.email || typeof req.body.email == undefined || req.body.email == null || req.body.email.length < 8) {
        erros.push({ texto: "Insira um e-mail válido" })
    }
    if (!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null || req.body.senha.length < 6) {
        erros.push({ texto: "Insira uma senha válida" })
    }
    if (req.body.senha != req.body.senha2) {
        erros.push({ texto: "As senhas informada direferem uma da outra!" })
    }
    if (erros.length > 0) {
        res.render('admi/adminForms/FormAdm', { erros: erros })
    }
    else {
        Administrador.findOne({ where: { email: req.body.email } }).then((adm) => {
            if (adm) {
                req.flash("error_msg", "E-mail já resgistrado na plataforma")
                res.redirect('/anhangueraeventos/cadastroAdm')
            } else {
                const temp = ({
                    senha: req.body.senha
                })

                bcrypt.genSalt(10, (erro, salt) => {
                    bcrypt.hash(temp.senha, salt, (erro, hash) => {
                        if (erro) {
                            req.flash("error_msg", "Houve um erro durante o registro")
                            res.redirect("/")
                        }

                        Administrador.create({
                            nome: req.body.nome,
                            email: req.body.email,
                            senha: hash,
                            //senha: bcrypt.hash(req.body.senha, bcrypt.genSaltSync(10)),
                            estado: req.body.estado
                        }).then(function () {
                            req.flash("success_msg", "Administrador registrado")
                            res.redirect('/anhangueraeventos/loginAdm')
                        }).catch(function (erro) {
                            req.flash("error_msg", "houve um erro ao cadastrar")
                            res.send("Erro na cria na criação do administrado: " + erro)
                        })

                    })




                })


            }
        }).catch((err) => {
            req.flash("error_msg", "Erro no sistema!")
            res.redirect('/')
        })
    }

})

//Pagina de login do adm
router.get('/loginAdm', (req, res) => {
    res.render('admi/LoginAdm')
})

router.post('/sss', (req, res, next) => {
    /*passaport.authenticate("local", {
        successRedirect: "/anhangueraeventos/homepage",
        failureRedirect: "/anhangueraeventos/loginAdm",
        failureFlash : true
    })(req, res, next)*/
})
//Verifica dados de login
router.post('/verificaLogin', (req, res) => {
    res.redirect('/anhangueraeventos/homepage')
})

//Pagina de formulario de criação de evento
router.get('/formEvento', (req, res) => {
    res.render('admi/adminForm/FormEvento')
})

//Adiciona dados do formulario eventos ao DB
router.post('/addEvento', (req, res) => {
    Eventos.create({
        nome: req.body.nome,
        participanteEs: req.body.participanteEs,
        tipoEvento: req.body.tipoEvento,
        quantSalas: req.body.quantSalas,
        nomeAdm: req.body.nomeAdm,
        emailAdm: req.body.emailAdm
    }).then(function () {
        res.redirect('/homepage')
    }).catch(function (erro) {
        res.send("Erro na criação do evento: " + erro)
    })

})
// Página de eventos criados
router.get('/ListarEventos', (req, res) => {
    Eventos.findAll().then(function (eventos) {
        res.render('admi/ListarEventos', { listEvent: eventos })
    })
})
//homepage do adm
router.get('/homepage', (req, res) => {
    res.render('admi/GerenciaDeEvento')
})

//pagina de gerenciamento de atividades
router.get('/gerenciaDeAtividades', (req, res) => {

    Atividades.findAll().then(function (atividades) {

        res.render('admi/gerenciaDeAtividades', { regist: atividades })
    })
})

// Página de usuários cadastrados
router.get('/listarUsuarios', (req, res) => {
    Usuarios.findAll().then(function (usuarios) {
        res.render('admi/listarUsuarios', { listarUsers: usuarios })
    })
})

//pagina de formulario de atividades
router.get('/formAtividades', (req, res) => {
    res.render('admi/adminForms/FormAtividade')
})

//rota que adiciona os dados de atividades ao DB
router.post('/addAtividade', (req, res) => {
    var erros = []
    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null || req.body.nome.length < 2) {
        erros.push({ texto: "ATIVIDADE INVALIDA" })
    }
    if (!req.body.ministrante || typeof req.body.ministrante == undefined || req.body.ministrante == null || req.body.ministrante.length < 2) {
        erros.push({ texto: "MINISTRANTE INVALIDO" })
    }
    // O HORARIO FINAL NÃO PODE SER MENOR QUE O HORARIO DE INICIO
    if (req.body.horaFinal <= req.body.horaInicio) {
        erros.push({ texto: "HORARIO FINAL INVALIDO" })
    }
    if (req.body.tipo == "--Atividade--") { erros.push({ texto: "TIPO DE ATIVIDADE INVALIDA" }) }
    if (!req.body.data || typeof req.body.data == undefined || req.body.data == null) {
        erros.push({ texto: "DATA INVALIDA" })
    }
    // CASO NÃO ESCOLHA NENHUMA DAS OPIÇÕES DO SELECT
    if (req.body.sala == "--Informe a sala--") { erros.push({ texto: "SALA INVALIDA" }) }
    if (req.body.cargaHoraria == "--Informe a CH--") { erros.push({ texto: "CARGA HORARIO INVALIDO" }) }
    if (req.body.inscricaoT == "--Tipo--") { erros.push({ texto: "TIPO DE INSCRIÇÃO INVALIDA" }) }
    if (!req.body.numeroDePartic || typeof req.body.numeroDePartic == undefined || req.body.numeroDePartic == null) {
        erros.push({ texto: "NÚMERO DE PARTICIPANTES INVALIDO" })
    }
    // CASO A INSCRIÇÃO FOR PAGA ELE VALIDA OS CAMPO ABAIXO
    if (req.body.inscricaoT == "Paga") {
        if (!req.body.valor || typeof req.body.valor == undefined || req.body.valor == null) {
            erros.push({ texto: "VALOR INVALIDO INVALIDO" })
        }
        if (!req.body.prazo || typeof req.body.prazo == undefined || req.body.prazo == null) {
            erros.push({ texto: "PRAZO DE INSCRIÇÃO INVALIDO" })
        }
        if (!req.body.numConta || typeof req.body.numConta == undefined || req.body.numConta == null || req.body.numConta.length < 10) {
            erros.push({ texto: "NÚMERO DA CONTA INVALIDO" })
        }
        if (!req.body.agencia || typeof req.body.agencia == undefined || req.body.agencia == null || req.body.agencia.length < 4) {
            erros.push({ texto: "AGÊNCIA INVALIDA" })
        }
        if (!req.body.banco || typeof req.body.banco == undefined || req.body.banco == null || req.body.banco.length < 5) {
            erros.push({ texto: "NOME BANCO INVALIDO" })
        }
        if (!req.body.cpf || typeof req.body.cpf == undefined || req.body.cpf == null || req.body.cpf.length < 14) {
            erros.push({ texto: "CPF INVALIDO" })
        }
        if (req.body.prazo > req.body.data) {
            erros.push({ texto: "PRAZO DE INSCRIÇÃO INVALIDO" })
        }
    }
    // QUANTIDADE DE ERROS DENTRO DO VETOR
    if (erros.length > 0) {
        // CASO A QUANTIDADES DE CAMPOS FOR MUITO GRANDE A MSG APARECE
        if (erros.length > 12) {
            var err = []
            err.push({ texto: "PREENCHA OS CAMPOS QUE ESTÃO FALTANDO" })
            res.render('admi/adminForms/FormAtividade', { err: err })
        }
        // SE OS CAMPOS QUE ESTÃO FALTANDO NÃO FOREM MUITOS APARECE QUAIS ESTÃO FALTANDO
        else {
            res.render('admi/adminForms/FormAtividade', { erros: erros })
        }
    }
    else {
        // TENTATIVA DE VERIFICAR OS DADOS QUE JÁ TEM NO BANCO DE DADOS
        Atividades.findOne({ where: { sala: req.body.sala } }).then((atividade) => {
            Atividades.findOne({ where: { data: req.body.data } }).then((atividade) => {
                Atividades.findOne({ where: { horaInicio: req.body.horaInicio } }).then((atividade) => {
                    if (atividade) {
                        req.flash("error_msg", "Já existe uma atividade com os mesmos dados na plataforma")
                        res.redirect('/anhangueraeventos/formAtividades')
                    } else {
                        Atividades.create({
                            nome: req.body.nome,
                            tipo: req.body.tipo,
                            data: req.body.data,
                            ministrante: req.body.ministrante,
                            horaInicio: req.body.horaInicio,
                            horaFinal: req.body.horaFinal,
                            sala: req.body.sala,
                            cargaHoraria: req.body.cargaHoraria,
                            numeroDePartic: req.body.numeroDePartic,
                            inscricaoT: req.body.inscricaoT,
                            valor: req.body.valor,
                            prazo: req.body.prazo,
                            numConta: req.body.numConta,
                            banco: req.body.banco,
                            agencia: req.body.agencia,
                            cpf: req.body.cpf
                        }).then(function () {
                            res.redirect('/anhangueraeventos/gerenciaDeAtividades')
                        }).catch(function (err) {
                            req.flash("error_msg", "houve um erro ao criar atividade")
                            res.send("Erro na cria na criação da ativifade: " + err)
                        })
                    }
                }).catch((err) => {
                    req.flash("error_msg", "Erro no sistema!")
                    res.redirect('/')
                })
            }).catch((err) => {
                req.flash("error_msg", "Erro no sistema!")
                res.redirect('/')
            })
        }).catch((err) => {
            req.flash("error_msg", "Erro no sistema!")
            res.redirect('/')
        })
    }
})

//Exibe formulario de edeicao de atividades
router.get('/formModifica/:id', (req, res) => {
    Atividades.findOne({ where: { 'id': req.params.id } }).then((atividades) => {
        res.render('admi/adminForms/FormModAtividade', { atividades: atividades })
    }).catch((err) => {
        req.flash("error_msg", "Erro ao busca atividade")
        res.redirect('anhangueraeventos/gerenciaDeAtividades')
    })

})

//Edita as atividades
router.post('/modAtividades/', (req, res) => {
    Atividades.update({
        nome: req.body.nome,
        tipo: req.body.tipo,
        data: req.body.data,
        ministrante: req.body.ministrante,
        horaInicio: req.body.horaInicio,
        horaFinal: req.body.horaFinal,
        sala: req.body.sala,
        cargaHoraria: req.body.cargaHoraria,
        numeroDePartic: req.body.numeroDePartic,
        inscricaoT: req.body.inscricaoT,
        valor: req.body.valor,
        prazo: req.body.prazo,
        numConta: req.body.numConta,
        banco: req.body.banco,
        agencia: req.body.agencia,
        cpf: req.body.cpf
    }, { where: { 'id': req.body.id } }).then(() => {
        req.flash("success_msg", "Edição concluida com exito")
        res.redirect('/anhangueraeventos/gerenciaDeAtividades')
    }).catch((err) => {
        req.flash("error_msg", "Erro ao editar atividade")
        res.redirect('anhagueraeventos/gerenciaDeAtividades')
    })
})

//remove atividades
router.get('/removeAtividade/:id', function (req, res) {
    Atividades.destroy({ where: { 'id': req.params.id } }).then(function () {
        res.redirect('/anhangueraeventos/gerenciaDeAtividades')
    }).catch(function (erro) {
        res.send("erro ao remover atividade: " + erro)
    })
})

module.exports = router
