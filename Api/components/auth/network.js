const express = require('express');

const response = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

router.post('/login', login);


function login (req, res){
    controller.login(req.body.email, req.body.password).then((token)=>{
        response.success(req, res, token, 200);
    }).catch((err) =>{
        response.error(req, res, 'Informacion Invalida', 400);
    });
}

module.exports = router;