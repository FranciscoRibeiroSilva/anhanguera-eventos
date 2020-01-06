module.exports = {
    eAdmi(req, res, next){
        if(req.isAuthenticated()){
            return next()
        }

        req.flash("error_msg", 'Você deve estar logado para acessar')
        res.redirect('/login')
    }
}