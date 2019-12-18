const express = require("express")
const router = express.Router()
const Administrador = require('../models/Administrador')
const Eventos = require('../models/Eventos')
const Atividades = require('../models/Atividades')
const Usuarios = require('../models/Usuarios')
const Ministrantes = require('../models/Ministrantes')
const bcrypt = require("bcryptjs")
const Cupons = require("../models/Cupons")
const jwt = require('jsonwebtoken')
//const athee = require('../midleware/auth')
//const passport = require("passport")

//const authConfig = require('../config/auth.json')

//router.use(athee);

//pagina Sobre
router.get('/sobreNos', (req, res) => {
    res.render('admi/sobre')
})

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
    res.render('index')
})

/*router.post('/sss', (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/anhangueraeventos/homepage",
        failureRedirect: "/",
        failureFlash : true
    })(req, res, next)
})*/

/*function geraToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    })
}*/

router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    const user = await Administrador.findOne({ where: { email: req.body.email } })

    if (!user) {
        req.flash("error_msg", "E-mail incorreto")
        res.redirect('/')
    }

    if (!await bcrypt.compare(senha, user.senha)) {
        req.flash("error_msg", "Senha incorreta")
        res.redirect('/')
    }

    //res.redirect("/anhangueraeventos/homepage",{token : geraToken({id : user.id})})
    res.redirect("/anhangueraeventos/homepage")

})
//Verifica dados de login
router.post('/verificaLogin', (req, res) => {
    Administrador.findOne({ where: { email: req.body.email } }).then((adm) => {
        if (adm.email == req.body.email) {
            res.redirect('/anhangueraeventos/homepage')
        }
        else {
            req.flash("error_msg", "Erro ao logar verifique os seus dados")
            res.redirect('/')
        }
    }).catch(() => {
        req.flash("error_msg", "Erro ao logar verifique os seus dados")
        res.redirect('/')
    })
})
router.get('/gerenciaEvento', (req, res) => {
    res.render('admi/gerenciaDeEvento')
})

router.get('/gerenciaCupons', (req, res) => {
    Cupons.findAll().then(function (cupons) {
        res.render('admi/gerenciaCupons', { listaCupons: cupons })
    })
})
//pagina de formulario do cupom
router.get('/formCupons', (req, res) => {
    res.render('admi/FormCupons')
})

//Adiciona cupom ao DB
router.post('/addCupom', (req, res) => {
    var erros = []
    if (!req.body.codigo || typeof req.body.codigo == undefined || req.body.codigo == null || req.body.codigo.length < 6 || req.body.codigo.length>6) {
        erros.push({ texto: "O CUPOM DEVE TER 6 CARACTERES" })
    }
    if (!req.body.quantidade || typeof req.body.quantidade == undefined || req.body.quantidade == null || req.body.quantidade <0) {
        erros.push({ texto: "QUANTIDADE DE CUPONS INVALIDA" })
    }
    if (!req.body.validade || typeof req.body.validade == undefined || req.body.validade == null) {
        erros.push({ texto: "DATA DE VALIDADE INVALIDA" })
    }
    if (req.body.desconto == "Escolher op") {
        erros.push({ texto: "ESCOLHA O DESCONTO PARA O CUPOM" })
    }

    if (erros.length > 0) {
        res.render('admi/FormCupons', { erros: erros })
    }

    else {
        Cupons.create({
            codigo: req.body.codigo,
            desconto: req.body.desconto,
            quantidade: req.body.quantidade,
            validade: req.body.validade
        }).then(function () {
            res.redirect('/anhangueraeventos/gerenciaCupons')
        }).catch(function (err) {
            req.flash("error_msg", "Erro ao adicionar cupom")
        })
    }

})

//Pagina de formulario de criação de evento
router.get('/formEvento', (req, res) => {
    res.render('admi/adminForms/FormEvento')
})

//Adiciona dados do formulario eventos ao DB
router.post('/addEvento', (req, res) => {
    var erros = []
    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null || req.body.nome.length < 2 || req.body.nome.length>15) {
        erros.push({ texto: "NOME DO EVENTO INVALIDO" })
    }
    if (!req.body.quantSalas || typeof req.body.quantSalas == undefined || req.body.quantSalas == null || req.body.quantSalas < 0) {
        erros.push({ texto: "QUANTIDADE DE SALAS INVALIDO" })
    }
    if (!req.body.nomeAdm || typeof req.body.nomeAdm == undefined || req.body.nomeAdm == null || req.body.nomeAdm.length < 2 || req.body.nomeAdm.length>15) {
        erros.push({ texto: "NOME DE ADMINISTRADOR INVALIDO" })
    }
    if (!req.body.emailAdm || typeof req.body.emailAdm == undefined || req.body.emailAdm == null || req.body.emailAdm.length < 12 || req.body.emailAdm.length>30) {
        erros.push({ texto: "EMAIL INVALIDO" })
    }
    if (req.body.participanteEs == "Escolher op") {
        erros.push({ texto: "ESCOLHA O NUMERO DE PARTICIPANTES ESPERADOS" })
    }
    if (!req.body.local || typeof req.body.local == undefined || req.body.local == null || req.body.local.length < 5 || req.body.local.length >25) {
        erros.push({ texto: "LOCAL INVALIDO" })
    }

    if (req.body.tipoEvento == "Escolher op") {
        erros.push({ texto: "ESCOLHA O TIPO DE EVENTO" })
    }
    if (req.body.eventoTipo == "--Tipo--") {
        erros.push({ texto: "ESCOLHA GRATUITA OU PAGA" })
    }
    if (req.body.eventoTipo == "Paga") {
        if (!req.body.valorEvento || typeof req.body.valor == undefined || req.body.valorEvento == null) {
            erros.push({ texto: "VALOR INVALIDO" })
        }
    }

    if (erros.length > 0) {
        res.render('admi/adminForms/FormEvento', { erros: erros })
    }
    else {
        Eventos.create({
            nome: req.body.nome,
            participanteEs: req.body.participanteEs,
            tipoEvento: req.body.tipoEvento,
            quantSalas: req.body.quantSalas,
            nomeAdm: req.body.nomeAdm,
            emailAdm: req.body.emailAdm,
            local: req.body.local,
            data: req.body.data,
            eventoTipo: req.body.eventoTipo,
            valorEvento: req.body.valorEvento
        }).then(function () {
            res.redirect('/anhangueraeventos/homepage')
        }).catch(function (erro) {
            res.send("Erro na criação do evento: " + erro)
        })
    }

})
// Página de eventos criados
router.get('/homepage', (req, res) => {
    Eventos.findAll().then(function (eventos) {
        res.render('admi/homepage', { listEvent: eventos })
    })
})
//homepage do adm
router.get('/gerenciarEvento', (req, res) => {
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

//pagina de formulario de ministrante
router.get('/formMinistrantes', (req, res) => {
    res.render('admi/adminForms/FormMinistrantes')
})
//pagina de gerenciamento de ministrantes
router.get('/gerenciaMinistrantes', (req, res) => {

    Ministrantes.findAll().then(function (ministrantes) {
        res.render('admi/gerenciaMinistrantes', { listaMinistrantes: ministrantes })
    })
})
//adiciona dados do ministrante adm ao BD
router.post('/addMinistrantes', (req, res) => {
    var erros = []
    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null || req.body.nome.length < 2) {
        erros.push({ texto: "Insira um nome válido" })
    }
    if (!req.body.email || typeof req.body.email == undefined || req.body.email == null || req.body.email.length < 8) {
        erros.push({ texto: "Insira um e-mail válido" })
    }
    if (!req.body.telefone || typeof req.body.telefone == undefined || req.body.telefone == null || req.body.telefone.length < 8) {
        erros.push({ texto: "Insira uma telefone válido" })
    }
    if (erros.length > 0) {
        res.render('admi/adminForms/FormMinistrantes', { erros: erros })
    }
    else {
        Ministrantes.create({
            nome: req.body.nome,
            email: req.body.email,
            telefone: req.body.telefone
        }).then(function () {
            req.flash("success_msg", "Ministrante adicionado")
            res.redirect('/anhangueraeventos/gerenciaMinistrantes')
        }).catch(function (erro) {
            req.flash("error_msg", "Houve um erro ao adicionar")
            res.send("Erro na cria em adicionar ministrante: " + erro)
        })
    }
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

    if (req.body.tipo == "--Atividade--") { erros.push({ texto: "TIPO DE ATIVIDADE INVALIDA" }) }
    if (!req.body.data || typeof req.body.data == undefined || req.body.data == null) {
        erros.push({ texto: "DATA INVALIDA" })
    }
    // CASO PASSE DO QUANTIDADE MAXIMO DE SALAS
    if (req.body.sala > 10 || !req.body.sala || typeof req.body.sala == undefined || req.body.sala == null) {
        erros.push({
            texto: "INFORME A QUANTIDADE DE SALAS VALIDAS"
        })
    }

    if (req.body.cargaHoraria == "--Informe a CH--") { erros.push({ texto: "CARGA HORARIO INVALIDO" }) }
    if (req.body.inscricaoT == "--Tipo--") { erros.push({ texto: "TIPO DE INSCRIÇÃO INVALIDA" }) }
    if (!req.body.numeroDePartic || typeof req.body.numeroDePartic == undefined || req.body.numeroDePartic == null) {
        erros.push({ texto: "NÚMERO DE PARTICIPANTES INVALIDO" })
    }
    if (req.body.prazo > req.body.data) {
        erros.push({ texto: "PRAZO DE INSCRIÇÃO INVALIDO" })
    }
    if (!req.body.prazo || typeof req.body.prazo == undefined || req.body.prazo == null) {
        erros.push({ texto: "PRAZO DE INSCRIÇÃO INVALIDO" })
    }
    // CASO A INSCRIÇÃO FOR PAGA ELE VALIDA OS CAMPO ABAIXO
    if (req.body.inscricaoT == "Paga") {
        if (!req.body.valor || typeof req.body.valor == undefined || req.body.valor == null) {
            erros.push({ texto: "VALOR INVALIDO INVALIDO" })
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
    }
    // QUANTIDADE DE ERROS DENTRO DO VETOR
    if (erros.length > 0) {
        // CASO A QUANTIDADES DE CAMPOS FOR MUITO GRANDE A MSG APARECE
        if (erros.length > 10) {
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
        // VERIFICAR SE JÁ TEM OS MESMOS DADOS NO BANCO DE DADOS
        Atividades.findOne({
            where: {
                sala: req.body.sala,
                data: req.body.data,
                horaInicio: req.body.horaInicio,
                duracao: req.body.duracao
            }
        }).then((atividade) => {
            var dadosJaExiste = []
            if (atividade) {
                req.flash("error_msg", "Já existe uma atividade com os mesmos dados na plataforma")
                dadosJaExiste.push({ texto: "DATA, SALA E HORÁRIO JÁ OCUPADOS" })
                res.render('admi/adminForms/FormAtividade', { dadosJaExiste: dadosJaExiste })
                //res.redirect('/anhangueraeventos/formAtividades')
            } else {
                Atividades.create({
                    nome: req.body.nome,
                    tipo: req.body.tipo,
                    data: req.body.data,
                    ministrante: req.body.ministrante,
                    horaInicio: req.body.horaInicio,
                    duracao: req.body.duracao,
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
    }
})

//Exibe formulario de edeicao de atividades
router.get('/formModifica/:id', (req, res) => {
    Atividades.findOne({ where: { 'id': req.params.id } }).then((atividades) => {
        res.render('admi/adminForms/FormModAtividade', { atividades: atividades })
    }).catch((err) => {
        req.flash("error_msg", "Erro ao busca atividade")
        res.redirect('/anhangueraeventos/gerenciaDeAtividades')
    })
})

//Edita as atividades
router.post('/modAtividades/', (req, res) => {
    var erros = []
    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null || req.body.nome.length < 2) {
        erros.push({ texto: "ATIVIDADE INVALIDA" })
    }
    if (!req.body.ministrante || typeof req.body.ministrante == undefined || req.body.ministrante == null || req.body.ministrante.length < 2) {
        erros.push({ texto: "MINISTRANTE INVALIDO" })
    }

    if (req.body.tipo == "--Atividade--") { erros.push({ texto: "TIPO DE ATIVIDADE INVALIDA" }) }
    if (!req.body.data || typeof req.body.data == undefined || req.body.data == null) {
        erros.push({ texto: "DATA INVALIDA" })
    }
    // CASO PASSE DO QUANTIDADE MAXIMO DE SALAS
    if (req.body.sala > 10 || !req.body.sala || typeof req.body.sala == undefined || req.body.sala == null) {
        erros.push({
            texto: "INFORME A QUANTIDADE DE SALAS VALIDAS"
        })
    }

    if (req.body.cargaHoraria == "--Informe a CH--") { erros.push({ texto: "CARGA HORARIO INVALIDO" }) }
    if (req.body.inscricaoT == "--Tipo--") { erros.push({ texto: "TIPO DE INSCRIÇÃO INVALIDA" }) }
    if (!req.body.numeroDePartic || typeof req.body.numeroDePartic == undefined || req.body.numeroDePartic == null) {
        erros.push({ texto: "NÚMERO DE PARTICIPANTES INVALIDO" })
    }
    if (req.body.prazo > req.body.data) {
        erros.push({ texto: "PRAZO DE INSCRIÇÃO INVALIDO" })
    }
    if (!req.body.prazo || typeof req.body.prazo == undefined || req.body.prazo == null) {
        erros.push({ texto: "PRAZO DE INSCRIÇÃO INVALIDO" })
    }
    // CASO A INSCRIÇÃO FOR PAGA ELE VALIDA OS CAMPO ABAIXO
    if (req.body.inscricaoT == "Paga") {
        if (!req.body.valor || typeof req.body.valor == undefined || req.body.valor == null) {
            erros.push({ texto: "VALOR INVALIDO INVALIDO" })
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
    }
    // QUANTIDADE DE ERROS DENTRO DO VETOR
    if (erros.length > 0) {
        // CASO A QUANTIDADES DE CAMPOS FOR MUITO GRANDE A MSG APARECE
        if (erros.length > 10) {
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
        Atividades.update({
            nome: req.body.nome,
            tipo: req.body.tipo,
            data: req.body.data,
            ministrante: req.body.ministrante,
            horaInicio: req.body.horaInicio,
            duracao: req.body.duracao,
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

        },
            {
                where: { 'id': req.body.id }
            }).then(() => {
                req.flash("success_msg", "Edição concluida com exito")
                res.redirect('/anhangueraeventos/gerenciaDeAtividades')
            }).catch((err) => {
                req.flash("error_msg", "Erro ao editar atividade")
                res.redirect('/anhangueraeventos/gerenciaDeAtividades')
            })
    }
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
