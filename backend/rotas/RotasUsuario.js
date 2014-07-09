module.exports = function(app){

    var usuarioCtrl = require('../controllers/ControleUsuario');

    app.post('/newUser', usuarioCtrl.insert, function(req, res){
    });

    app.get('/usuario/:u', usuarioCtrl.getById, function(req, res){

    });

    app.post('/usuarios', usuarioCtrl.getAll, function(req, res){

    });

    app.post('/buscarUsuario/nome', usuarioCtrl.getAll, function(req, res){

    });

    app.post('/addAmigo', usuarioCtrl.addAmigo, function(req, res){

    });
    app.get('/user/:id', usuarioCtrl.getOne, function(req, res){

    });
    app.post('/getSeguidores', usuarioCtrl.getSeguidores, function(req, res){

    });

    app.get('/totalSeguindo/:u', usuarioCtrl.getTotalSeguindo, function(req, res){

    });

    app.post('/alterar/imagem', usuarioCtrl.update, function(req, res){

    });

    app.put('/alterar/usuario', usuarioCtrl.updateNames, function(req, res){

    });

    app.put('/alterar/email', usuarioCtrl.updateEmail, function(req, res){

    });

    app.put('/alterar/senha', usuarioCtrl.updateSenha, function(req, res){

    });

    app.post('/remover', usuarioCtrl.remove, function(req, res){

    });




};
