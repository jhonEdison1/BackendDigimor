const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');


const secret = config.jwt.secret


function sign(data){
   return jwt.sign(data, secret);
}

function verify(token){
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        //TODO: customizar error
        throw new Error('Token Invalido');
    }
        
}
    



const check ={
    own: function(req, owner){
       const decoded = decodeHeader(req);
       console.log(decoded);

       //comprobar si es Propio
       if(decoded.id !==owner){
           throw error('no puedes hacer esto', 401);        
       }

    },
}

function getToken(authorization){
    if(!authorization){
        //TODO: customizar error
        throw new Error('No Existe un Token');
    }
    if(authorization.indexOf('Bearer ') === -1){
        //TODO: customizar error
        throw new Error('Formato de Token Invalido');
    }

    
    let token = authorization.replace('Bearer ', '');
    //console.log(token);
    return token;
}

function decodeHeader(req){
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user= decoded;

    return decoded;   
}

module.exports = {
    sign,
    check
};