const jwt = require('jsonwebtoken');
const jwt_token = require('../../variables');

exports.required = (req, res, next ) => {
        try { 
            const  token  = req.headers.authorization.split(' ')[1];
            const decode = jwt.verify(token, jwt_token)
            req.usuario = decode
            next()

    } catch(err) {
        console.log(err)
        return res.status(401).json('Erro de autenticação');
    }
},

exports.optional = (req, res, next ) => {
        try { 
            const  token  = req.headers.authorization.split(' ')[1];
            const decode = jwt.verify(token, jwt_token)
            console.log(req.usuario)
            req.usuario = decode
            next()

    } catch(err) {
        console.log(err)
        next()
    }
};
