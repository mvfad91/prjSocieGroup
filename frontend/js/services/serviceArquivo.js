var servidor = 'http://localhost:3001';

redeSocialApp.service('serviceArquivo', function($http){
    return {
        listarArquivos: function(projeto, cb){
            $http.post(servidor + '/arquivos', projeto).success(function(data){
                cb(data);
            });
        },
        downloadArquivo: function(dn, prj, ar){
            $http.post(servidor + '/download/arquivo', dn, prj, ar);
        }
    }
});