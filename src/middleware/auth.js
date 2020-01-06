const jwt = require('jsonwebtoken')
const authentic = require('../config/authentic')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.send('Token invalid')
    }

    const parts = authHeader.split(' ')

    if (!(parts.length === 2)){
        return res.send('error format')
    }

    const [scheme, token] = parts
    
    let flag = scheme.toLowerCase().indexOf('bearer');

    if(flag < 0){
        return res.send('token icorrect')
    }

    jwt.verify(token, authentic.secret, (err, decoded) =>{
        if(err){
            return res.send('token icorrect')
        }

        req.userId = decoded.id
        return next()
    })

}