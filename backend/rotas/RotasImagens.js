module.exports = function(app){

    var imgCtrl = require('../controllers/ControleImagem');

    app.post('/upload/fotoUsuario', imgCtrl.inserirImagem, function(req, res){ });

    app.get('/photos/:file', imgCtrl.exibirImagem, function(req, res){ });

    app.get('/photos', function(req, res){

        res.end();

    });



};
