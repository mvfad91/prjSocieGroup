module.exports = function(app){

    var recadoCtrl = require('../controllers/ControleRecado');

    app.get('/recado/:u', recadoCtrl.getAll, function(req, res){

    });

    app.post('/recado/:u', recadoCtrl.insert, function(req, res){
    });

    app.post('/recadoProjeto/:u', recadoCtrl.insert, function(req, res){
    });

    app.get('/recadoProjeto/:u', recadoCtrl.getAll, function(req, res){

    });

    app.get('/totalRecados/:u', recadoCtrl.getTotalRecados, function(req, res){

    });

    app.post('/alterar/recado', recadoCtrl.update, function(req, res){

    });
};
