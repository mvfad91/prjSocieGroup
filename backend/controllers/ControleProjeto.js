var prjModel = require('../models.dao/ProjetoDAO');
var UsuarioDAO = require('../models.dao/UsuarioDAO');

exports.getById = function(req, res){

    var id = req.params.u;

    prjModel.findById(id, function(err, resultado){
        if(err || !resultado){
            console.log("erro no get by id no controller do projeto");
        }else{
            res.json(resultado);
        }
    });
};

exports.getOne = function(req, res){

    var id = req.params.u;

        prjModel.findOne(id, function(err, resultado){
            if(err || !resultado){
                console.log("erro no getone do controller do projeto");
            }else{
                res.json(resultado);
            }
        });

};

exports.insert = function(req, res){


    var projeto = req.body;
    projeto.time = new Date().getTime();
    console.log(projeto);

            prjModel.insert(projeto, function(err, resultado){
                if(err || !resultado){
                    console.log("erro no api do prj");
                }else{
                    res.json(resultado);
                }
            });
    };

exports.seguirProjeto = function(req, res){

    var seguir = {idProjeto: req.params.u, idUsuario: req.session.user._id };

    prjModel.update(seguir, function(err, resultado){
        res.json(resultado);

    });
};

exports.buscarSeguidores = function(req, res){

    UsuarioDAO.findSeguidores(req, function(err, resultado){

        res.json(resultado);
    });


};

exports.buscarPorNome = function(req, res){

    var titulo = {titulo: req.params.nome};

    prjModel.buscarPorNome(titulo, function(err, resultado){
        res.json(resultado);
    });
};


exports.getTotalProjetos = function(req, res){

    var id = req.params.u;

    prjModel.getTotalProjetos(id, function(err, cb){
        res.json(cb);
    });
};
