module.exports = {

    //administradores
    login(req, res){
        res.render('index')
    },
    sobre(req, res){
        res.render('admi/sobre')
    },
    formAdm(req, res){
        res.render('admi/adminForms/FormAdm')
    },
    homepage(req, res){
        res.render('admi/homepage')
    },
    formEvento(req, res){
        res.render('admi/adminForms/FormEvento')
    },
    formAtividade(req, res){
        res.render('admin/adminForms/FormAtividade')
    },
    formMinistrantes(req, res){
        res.render('admi/adminForms/FormMinistrantes')
    },
    formModAtividade(req, res){
        res.render('admi/adminForms/FormModAtividade')
    },
    formCupon(req, res){
        res.render('admi/adminForms/FormCupons')
    },
    gerenciaCupons(req, res){
        res.render('admi/gerenciaCupons')
    },
    gerenciaAtividades(req, res){
        res.render('admi/gerenciaDeAtividades')
    },
    gerenciaEventos(req, res){
        res.render('admi/gerenciaDeEvento')
    },
    gerenciaMinistrante(req, res){
        res.render('admi/gerenciaMinistrantes')
    },
    listaUsuarios(req, res){
        res.render('admi/listarUsuarios')
    },
    logoutAdm(req, res){
        req.logout()
        req.flash('error_msg', 'deslogado')
        res.redirect('/login')
    },


    //participantes
    certificado(req, res){
        res.render('user/Certificado')
    },
    certificadoPorAtividade(req, res){
        res.render('user/CertificadoPorAtividade')
    },
    loginParticipante(req, res){
        res.render('user/indexPar')
    },
    listarAtividades(req, res){
        res.render('user/listaAtividades')
    },
    listaEventos(req, res){
        res.render('user/listarEventos')
    },
    loginPar(req, res){
        res.render('user/loginPar')
    },
    loginUsuario(req, res){
        res.render('user/loginUsuario')
    },
    inicial(req, res){
        res.render('inicial')
    }

}