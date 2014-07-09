module.exports = function(app){

    var projetoCtrl = require('../controllers/ControleProjeto');

    app.post('/projeto', projetoCtrl.insert, function(req, res){ });

    // get um projeto especifico passando a id do mesmo
    app.get('/projeto/:u', projetoCtrl.getOne, function(req, res){ });

    // get uma lista de projetos atraves da id do perfil.
    app.get('/projetos/:u', projetoCtrl.getById, function(req, res){ });

    app.post('/projeto/seguir/:u', projetoCtrl.seguirProjeto, function(req, res){ });

    app.get('/getProjetos/:nome', projetoCtrl.buscarPorNome, function(req, res){ });

    app.post('/seguidores', projetoCtrl.buscarSeguidores, function(req, res){ });

    app.get('/totalProjetos/:u', projetoCtrl.getTotalProjetos, function(req, res){

    });




}
