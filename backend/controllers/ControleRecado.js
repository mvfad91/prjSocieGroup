var RecadoDAO = require('../models.dao/RecadoDAO');

exports.getAll = function(req, res){

    RecadoDAO.list(req.params.u, function(err, resultado){
    res.json(resultado);

})
};

exports.getByid = function(req, res){
	var id = req.params.id;
	res.json( RecadoDAO.find(id) );
};

exports.insert = function(req, res) {

    req.body.time = new Date().getTime();
    req.body.idUsuario = req.params.u;

    RecadoDAO.insert(req.body, function(req, resultado){
        res.json(resultado);
    });

};

exports.update = function(req, res){

    RecadoDAO.update(req, function(err, resultado){

    });
};

exports.updateNames = function(req, res){
    RecadoDAO.updateNames(req, function(err, cb){

    });
};

exports.remove = function(req, res){
	var id = req.params.id;
	res.json( RecadoDAO.remove(id));
};

exports.getTotalRecados = function(req, res){

    var id = req.params.u;

    RecadoDAO.getTotalRecados(id, function(err, resultado){
        res.json(resultado);
    });
};