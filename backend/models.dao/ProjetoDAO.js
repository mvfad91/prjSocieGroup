var mongoose = require('mongoose');

var ProjetoSchema = mongoose.Schema({
    titulo: {type: String},
    descricao: {type: String},
    time: {type: Number},
    img: {type: String},
    autor: {
        nome:{type: String},
        sobrenome: {type: String}
    },
    arquivos: {type: Array, "default": [] },
    seguidores: {type: Array, "default": [] },
    idUsuario: {type: String}

});


var Projeto = mongoose.model('Projeto', ProjetoSchema);


exports.insert = function (req, res) {

    var prj = new Projeto();

    prj.titulo = req.titulo;
    prj.autor.sobrenome = req.autor.sobrenome;
    prj.autor.nome = req.autor.nome;
    prj.time = req.time;
    prj.descricao = req.descricao;
    prj.idUsuario = req.idUsuario;
    prj.seguidores.push(req.idUsuario);
    prj.img = "default-img-projeto.jpg";


    prj.save(function (err, dados) {
        res(err, dados);
    });

};

exports.update = function (req, res) {

    var id = req.idProjeto;
    var seguidor = req.idUsuario;



    Projeto.update(
        {_id: id},
        {
            $push: {
                seguidores: seguidor
            }
        }, function (err, doc) {
            res(err, doc);
        });



};


exports.findById = function (req, res) {


    var idUsuario = {seguidores: req};

    Projeto.find(idUsuario)
        .exec(function (err, data) {
            res(err, data);
        });


};


exports.findOne = function (req, res) {

    var id = {_id: req};

    Projeto.findOne(id)
        .exec(function (err, data) {
            res(err, data);
        });


};

exports.buscarPorNome = function(req, res)
{

    Projeto.find(req)
        .exec(function(err, data){
            res(err, data);
        });
};

exports.getTotalProjetos = function(req, res){

   Projeto.count({idUsuario: req}, function(err, n){ res(err, n)});
};








