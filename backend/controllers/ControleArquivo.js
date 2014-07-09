var fs = require('fs');
var path = require('path');
var diretorioServico = path.dirname(__dirname);

exports.anexarArquivo = function(req, res){

    var nomeDaPasta = req.params.id;

    fs.mkdirParent = function(dirPath, mode, callback) {
        fs.mkdir(dirPath, mode, function(error) {
            if (error && error.errno === 34) {
                fs.mkdirParent(path.dirname(dirPath), mode, callback);
                fs.mkdirParent(dirPath, mode, callback);
            }
            callback && callback(error);
        });
    };

    fs.mkdirParent(diretorioServico + '/anexos' + '/' + nomeDaPasta);

    fs.readFile(req.files.file.path, function(err, data){
        var nomeDoArquivo = req.files.file.name;
        var path = diretorioServico +"/anexos/"+ nomeDaPasta +"/"+ nomeDoArquivo;

        //escrever o arquivo dentro da pasta
        fs.writeFile(path, data, function(err, callback){

        });

        var aqv = {nome: nomeDoArquivo};
        res.json(aqv);
    });


};

exports.inserirArquivos = function(req, res){

    var nome_da_pasta = req.params.id + '/' + req.params.projeto;

    fs.mkdirParent = function(dirPath, mode, callback) {
        fs.mkdir(dirPath, mode, function(error) {

            if (error && error.errno === 34) {

                fs.mkdirParent(path.dirname(dirPath), mode, callback);

                fs.mkdirParent(dirPath, mode, callback);
            }

            callback && callback(error);
        });
    };

    fs.mkdirParent(diretorioServico + '/projetos' + '/' + nome_da_pasta);

    fs.readFile(req.files.file.path, function(err, data){
        var nome_do_arquivo = req.files.file.name;
        var path = diretorioServico +"/projetos/"+ nome_da_pasta +"/"+ nome_do_arquivo;

        fs.writeFile(path, data, function(err, callback){

        });
    });
    res.end();
};

exports.exibirArquivos = function(req, res){

    var prj = req.body;

    console.log(prj.idDono);
    var caminho = diretorioServico + "/projetos/" + prj.idDono + "/" + prj.idPrj;


    fs.readdir(caminho, function(err, files){
        res.json(files);
    });

};

exports.downloadArquivo = function(req, res){
    var prj = req.body;
    var path = '';

    if(prj.prj === undefined){
        path = diretorioServico + "/anexos/" + prj.dono + "/" + prj.arquivo;
    }else{
        path = diretorioServico + "/projetos/" + prj.dono + "/" + prj.prj + "/" + prj.arquivo;
    }

    res.download(path);
};
