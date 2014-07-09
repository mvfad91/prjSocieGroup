module.exports = function(app){

    var loginCtrl = require('../controllers/ControleLogin');

    app.post('/login', loginCtrl.logIn, function(req, res){
    });
};