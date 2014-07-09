var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    nome: {type: String},
    sobrenome: {type: String},
    email: {type: String},
    senha: {type: String},
    img: {type: String},
    amigos: {type: Array, "default": [] }
});

var User = mongoose.model('User', UserSchema);

exports.insert = function (req, res) {

    var user = new User();

    user.nome = req.nome;
    user.sobrenome = req.sobrenome;
    user.email = req.email;
    user.senha = req.senha;
    user.img = "default.jpg";

    user.save(function(err, dados) {
        if (err) return console.error(err);
        res(err, dados);

    });

};

exports.updateSenha = function(req, res){
    User.update({_id: req.body._id, senha: req.body.senha},
        {$set:{
            senha: req.body.novaSenha
        }}, function(err, doc){
            res(err, doc);
        }
    )
};

exports.updateEmail = function(req, res){
    User.update(
        {_id: req.body._id, senha: req.body.senha},
        {$set:{
            email: req.body.email
        }}, function(err, doc){
            res(err, doc);
        }
    )
};

exports.updateNames = function(req, res){

    console.log(req.body);

    User.update(
        {_id: req.body._id},
        {
            $set:{
                nome: req.body.nome,
                sobrenome: req.body.sobrenome
            }
        }, function(err, doc){
            res(err, doc);
        }
    )
};

exports.update = function (req, res) {

    User.update(
        {_id: req.body._id},
        {
            $set: {
                img: req.body.img
            }
        }, function (err, doc) {
            res(err, doc);
        });


};

exports.findById = function (req, res) {

    var query = {_id: req};
    User.findOne(query)
        .exec(function (err, user) {
            if (err || !user) {
                res(err, null);
            } else {
                res(err, user);
            }
        });
};


exports.findOne = function (req, res) {

    var email = req.email;
    var senha = req.senha;

    var query = {email: email, senha: senha};

    User
        .findOne(query)
        .exec(function (err, user) {
            if (err || !user) {
                res(err, null);
            } else {
                res(err, user);
            }
        });
};

exports.list = function (req, res) {

    User.find(req)
        .exec(function (err, usuario) {
            if (err || !usuario) {
                res(err, null);
            } else {
                res(err, usuario);
            }
        });
};

exports.addAmigo = function (req, res) {

    var usuarioDaSessaoId = req.idSessao;
    var amigo = req.idPerfil;

    User.update(
        {_id: usuarioDaSessaoId},
        {
            $push: {
                amigos: amigo
            }
        },
        function (err, doc) {
            res(err, doc);
        });


};

exports.findSeguidores = function(req, res){

    User.find({_id:
    {
        $in: req.body
    }}).exec(function(err, docs){
            res(err, docs);
        });

};

exports.buscarAmigos = function(req, res){

    User.find({_id:
    {
        $in: req.body
    }},
        {
            nome: 1,
            sobrenome: 1,
            email: 1,
            img: 1

    }).exec(function(err, docs){
        res(err, docs);
    });
};

exports.getTotalSeguindo = function(req, res){

    User.aggregate([{$unwind: "$amigos"},{$group: {_id: null, total:{$sum:1}}}],function(err, cb){res(err, cb)});
};

exports.remove = function(req, res){

    User.remove(
        {
            _id: req.body._id,
            senha: req.body.senha
        },{
            justOne: true
        }).exec(function(err, doc){
            res(err, doc);
        });
};