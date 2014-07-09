var mongoose = require('mongoose');

var recadoSchema = mongoose.Schema({


    texto: {type: String},
    idUsuario: {type: String},
    nomeUsuario: {type: String},
    sobrenomeUsuario: {type: String},
    img: {type: String},
    idPerfil: {type: String},
    time: {type: Number},
    anexo: {type: String}
});

recadoSchema.set('toJSON', { getters: true });
recadoSchema.set('toObject', { getters: true });

var Recado = mongoose.model('Recado', recadoSchema);

//mongoose.connect('mongodb://localhost/test');


exports.find = function (req, res) {

};

exports.insert = function (req, res) {
    var recado = new Recado();
    /*

    recado.texto = req.getTexto();
    recado.idUsuario = req.getIdUsuario();
    recado.idPerfil = req.getIdPerfil();
    recado.nomeUsuario = req.getNomeU();
    recado.sobrenomeUsuario = req.getSobrU();
    recado.time = req.getTime();
    recado.img = req.getImg();*/

    recado.texto = req.texto;
    recado.idUsuario = req.idUsuario;
    recado.idPerfil = req.idPerfil;
    recado.nomeUsuario = req.nomeUsuario;
    recado.sobrenomeUsuario = req.sobrenomeUsuario;
    recado.time = req.time;
    recado.img = req.img;
    recado.anexo = req.anexo;

    console.log(recado);

    /*	recado.texto = req.texto;
     recado.data = req.data;*/

    /*recado.save(function(err, dados){
     if(err) return console.error(err);
     console.dir(dados);
     });*/

    recado.save(function (err, doc) {
        res(err, doc);
    });

    //return recado;

};


exports.list = function (req, res) {

    var id = {idUsuario: req};


    Recado
        .find(id)
        .sort({time: -1})
        .exec(function (err, docs) {
            res(err, docs);
        });

};

exports.updateNames = function(req, res){
    Recado.update({idPerfil: req.body._id},
        {$set:{
        nomeUsuario: req.body.nome,
        sobrenomeUsuario: req.body.sobrenome}
        }, {
            multi: true
        },
        function(err, doc){
            res(err, doc);
        });
};

exports.update = function (req, res) {

    var id = req.body._id;
    var img = req.body.img;


    Recado.update(
        {idPerfil: id},
        {
            $set: {
                img: img
            }
        }, {
            multi: true
        }, function (err, doc) {
            res(err, doc);
        });


};

exports.getTotalRecados = function(req, res){

   Recado.count({idUsuario: req}, function(err, n){ res(err, n)});
};






