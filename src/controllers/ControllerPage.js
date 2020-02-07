module.exports = {
    login(req, res) {
        res.render('index')
    },
    formUser(req, res){
        res.render('users/forms/UserForm')
    },
}
//res.render('admi/adminForms/FormAdm')