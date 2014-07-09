var fs = require('fs');
var path = require('path');
var diretorioServico = path.dirname(__dirname);

exports.inserirImagem = function(req, res){

    fs.readFile(req.files.file.path, function (err, data) {

        var imageName = req.files.file.name

        if(!imageName){
            res.redirect("/");
            res.end();

        } else {

            var path = diretorioServico + "/photos/" + imageName;

            fs.writeFile(path, data, function (err) {
                var data = {img: imageName};
                res.json(data);
            });
        }
    });

};

exports.exibirImagem = function(req, res){

    file = req.params.file;
    var img = fs.readFileSync(diretorioServico + "/photos/" + file);
    res.writeHead(200, {'Content-Type': 'image/jpg' });
    res.end(img, 'binary');

};
