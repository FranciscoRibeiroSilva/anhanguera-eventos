module.exports = {

    homepage(req, res){
        res.render('index')
    },
    sobre(req, res){
        res.render('admi/sobre')
    },
    formAdm(req, res){
        res.render('admi/adminForms/FormAdm')
    }
}