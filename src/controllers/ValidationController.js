//const authenticConfig = require('../config/authentic')
const passport = require('passport')
module.exports = {
    validSession(req, res, next){
        passport.authenticate('local', {
            successRedirect: '/homepage',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next)
    }
}