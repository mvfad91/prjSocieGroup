redeSocialApp.controller('controleArquivo', function($scope, serviceArquivo){

    var prj = $scope.projetoAtual.titulo;
    var dono = $scope.projetoAtual.idUsuario;

    var projeto = {idDono: dono, idPrj: prj};

     serviceArquivo.listarArquivos(projeto, function(data){
         $scope.listaArquivos = data;
         console.log("lst de arquivos " + data);
   });


});


var ModalInstanceCtrlArquivo = function ($scope, $modalInstance, $upload, $route, titulo) {

    $scope.ok = function () {
        $modalInstance.close();
        $route.reload();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    //upar arquivo
    $scope.onFileSelect = function($files) {

        for (var i = 0; i < $files.length; i++) {
            var image = $files[i];
            $scope.upload = $upload.upload({
                url: 'http://localhost:3001/upload/arquivo/' + titulo.titulo +'/' + titulo.idUsuario,
                method: 'POST',
                file: image

            }).progress(function(evt) {
                    $scope.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total))
                }).success(function(data, status, headers, config) {

                });
        }

    }

};

var ModalInstanceCtrlExibirArquivos = function ($scope, $modalInstance,  $route, $log, arquivos, projeto, $http) {

    $scope.listaArquivos = arquivos;
    $scope.projetoAtual = projeto;

    $scope.ok = function () {
        $modalInstance.close();
        $route.reload();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.downloadArquivo = function(arquivo){

        var lista = $scope.listaArquivos;

        var idPrj = $scope.projetoAtual._id;
        var idDono = $scope.projetoAtual.idUsuario;
        var nomeArquivo = lista[arquivo];

        var download = {prj: idPrj, dono: idDono, nomeArquivo: nomeArquivo};

        $http.post('/download/arquivo', download).success(function(data){
            $scope.file = data;

        });
    };
};