var UsuarioDAO = require('../models.dao/UsuarioDAO');
var RecadoDAO = require('../controllers/ControleRecado');

exports.getAll = function(req, res){

    UsuarioDAO.list(req.body, function(err, resultado){
        if(err || !resultado){
            console.dir("erro no controller de usuario, usuario não encontrado");
        }else{
            res.json(resultado);
        }
    });

};

exports.getById = function(req, res){

    var id = req.params.u;

    if(id){
        UsuarioDAO.findById(id, function(err, cb){

            if(err || !cb){

            }else{
                var usuario = {_id: cb._id, nome: cb.nome, sobrenome: cb.sobrenome, img: cb.img, amigos: cb.amigos};

                res.json(usuario);
            }
        });
    }else{
         id = req.session.user._id;
        UsuarioDAO.findById(id, function(err, cb){
            if(err || !cb){

            }else{
                var usuario = {_id: cb._id, nome: cb.nome, sobrenome: cb.sobrenome, img: cb.img, amigos: cb.amigos};

                res.json(usuario);
            }
        });
    }


};

exports.getOne = function(req, res){
    UsuarioDAO.findOne(req.body, function(err, resultado){

        if(err || !resultado){
            res.json(resultado);
        }else{
            req.session.user = resultado;
            res.json(resultado);
        }

    });
};

exports.insert = function(req, res){

   UsuarioDAO.insert(req.body, function(err, cb){
        if(err || !cb){
            res.json(cb);
        }else{
            req.session.user = cb;

            var id = cb._id;
            var nome = cb.nome;
            var sobrenome = cb.sobrenome;

            var pessoa = {usuario:{idUsuario: id, nome: nome, sobrenome: sobrenome}};

            var usuario = {_id: cb._id, nome: cb.nome, sobrenome: cb.sobrenome, img: cb.img, amigos: cb.amigos }

            res.json(usuario);
        }
    });

};

exports.update = function(req, res){

   UsuarioDAO.update(req, function(err, usuario){
       res.end();
   });

};

exports.updateNames = function(req, res){
    UsuarioDAO.updateNames(req, function(err, usuario){
       RecadoDAO.updateNames(req, function(err, cb){

       });

       res.json(usuario);
    });
};

exports.updateEmail = function(req, res){
    UsuarioDAO.updateEmail(req, function(err, cb){
        res.json(cb);
    });
};

exports.updateSenha = function(req, res){
    UsuarioDAO.updateSenha(req, function(err, cb){
       res.json(cb);
    });
};


exports.remove = function(req, res){

    UsuarioDAO.remove(req, function(err, cb){
        res.json(cb);
    });
};

exports.addAmigo = function(req, res){

   var id = req.body.id;
   var idSessao = req.body.idSessao;

var seguir = {idSessao: idSessao, idPerfil: id};

    UsuarioDAO.addAmigo(seguir, function(req, resultado){
        res.json(resultado);
    });

};

exports.getSeguidores = function(req, res){

    UsuarioDAO.buscarAmigos(req, function(err, resultado){
        res.json(resultado);

    });
};

exports.getTotalSeguindo = function(req, res){

    var id = req.params.u;

    UsuarioDAO.getTotalSeguindo(id, function(err, cb){
        res.json(cb);
    });
};