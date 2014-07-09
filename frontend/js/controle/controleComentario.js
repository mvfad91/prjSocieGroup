//escopo filho de Controle Usuario.
redeSocialApp.controller('controleComentario', function($scope, $location, serviceProjeto, $rootScope, $modal, serviceComentario, serviceLogin, servicePerfil, $cookieStore, $log){

    var socket = io.connect('http://localhost:3001');


    $scope.comentario = {id: '', texto: '', nomeUsuario:'', sobrenomeUsuario: '', img:'', idPerfil:'', time:'', anexo: ''};
    $scope.selected = '';


    //inserir comentario
    $scope.enviarComentario = function(){
        $scope.usuarioDaSessao = $cookieStore.get('logado');

        var recado = $scope.comentario;
        recado.nomeUsuario = $scope.usuarioDaSessao.nome;
        recado.sobrenomeUsuario = $scope.usuarioDaSessao.sobrenome;
        recado.img = $scope.usuarioDaSessao.img;
        recado.idPerfil = $scope.usuarioDaSessao._id;
        recado.anexo = $scope.selected;

        var id = $scope.perfilAtual._id;

        serviceComentario.salvarComentario(id, recado, function(data){
            $scope.lista.unshift(data);
            socket.emit('postar msg', data);
            $scope.selected = '';
        });
    };

    //ver pagina de outro usuario
    $scope.visitarPerfil = function(usuario){

       if($location.path()==='/projeto'){
           servicePerfil.getPerfil(usuario, function(data){
               $location.path('/usuario');
           });

       }else{
           servicePerfil.visitarUsuario(usuario);
       }
    };


    //buscar comentários da página de um usuario:
    var listarComentarios = function(){

        if($scope.perfilAtual === undefined){
            $scope.perfilAtual = $scope.projetoAtual;
        }
        serviceComentario.getComentarios($scope.perfilAtual._id, function(data){
            $scope.lista = data;
        });
    };

    listarComentarios();

    $rootScope.$on('pedido', function(){
       listarComentarios();
    });

    serviceProjeto.listarProjetosPorId($scope.usuarioDaSessao._id, function(data){
        $scope.items = data;
    });


    $scope.anexarArquivo = function () {

        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: ModalInstanceCtrlAnexarArquivo,

            resolve: {
                usuario: function () {
                    return $scope.perfilAtual._id;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

});

var ModalInstanceCtrlAnexarArquivo = function ($scope, $location, $modalInstance, usuario, $upload, serviceUsuario, serviceComentario,  $cookieStore) {

    $scope.selected = {
        item: ""
    };

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

   // var usuario = $cookieStore.get('logado');

    $scope.onFileSelect = function($files) {

        for (var i = 0; i < $files.length; i++) {
            var file = $files[i];

            $scope.upload = $upload.upload({
                url: 'http://localhost:3001/anexar/arquivo/' + usuario,
                method: 'POST',
                file: file


            }).progress(function(evt) {
                    $scope.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                }).success(function(data, status, headers, config){
                    $scope.selected.item = data.nome;



                });
        }

    }
};