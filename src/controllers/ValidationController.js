const authenticConfig = require('../config/authentic')
const jstoken = require('jsonwebtoken')
const passport = require('passport')
module.exports = {
    generateToken(params = {}){
        return jstoken.sign(params, authenticConfig.secret, {
            expiresIn: 86400,
        });
    },
    validSession(req, res, next){
        passport.authenticate('local', {
            successRedirect: '/homepage',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next)
    }
}