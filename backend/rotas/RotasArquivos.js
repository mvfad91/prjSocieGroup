module.exports = function(app){

    var arquivoCtrl = require('../controllers/ControleArquivo');

    app.post('/arquivos', arquivoCtrl.exibirArquivos, function(req, res){ });

    app.post('/upload/arquivo/:projeto/:id', arquivoCtrl.inserirArquivos, function(req, res){ });

    app.post('/download/arquivo', arquivoCtrl.downloadArquivo, function(req, res){ });

    app.post('/download/anexo', arquivoCtrl.downloadArquivo, function(req, res){ });

    //app.post('/download/arquivo', function(req, res){ });

    app.post('/anexar/arquivo/:id', arquivoCtrl.anexarArquivo, function(req, res){ });

};
