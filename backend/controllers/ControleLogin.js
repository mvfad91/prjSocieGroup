var usuarioDAO = require('../models.dao/UsuarioDAO');

exports.logIn = function(req, res){

    usuarioDAO.findOne(req.body, function(err, resultado){
        if(err || !resultado){
            res.status(401);
            res.send(err);
        }else{
            req.session.user = resultado;
            res.json(resultado);
        }
    });

};

