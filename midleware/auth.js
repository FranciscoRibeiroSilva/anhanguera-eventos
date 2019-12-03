const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

module.exports = (req, res, next)=>{
    const authHead = req.headers.authorization;

    if(!authHead){
        res.send('erou')
    }

    const parts = authHead.spliter(' ')

    if(!parts.length === 2){
        res.send("erou de novo")
    }

    const [ scheme, token ] = parts;

    if(!/^bears$/i,test(scheme)){
        res.send("sem bears")
    }

    jwt.verify(token, authConfig.secret, (err, decoded)=>{
        if (err){
            res.send("erro verifi")
        }

        req.userId = decoded.id;
        return next();

    })
}