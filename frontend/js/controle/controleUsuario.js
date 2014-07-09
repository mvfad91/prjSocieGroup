redeSocialApp.controller('controleUsuario', function($scope, serviceUsuario, $modal, $cookieStore, $log){

    if($cookieStore.get('logado') !== undefined){
        var usuario = $scope.usuarioDaSessao = $cookieStore.get('logado');
        $scope.usuario = {_id: usuario._id, nome: usuario.nome, sobrenome: usuario.sobrenome, email: '', senha: '', novaSenha: '' };
        $scope.remover = {usuario: ''};
    }

    $scope.alterarUsuario = function(param){
        var params = $scope.usuario;

        switch (param){
            case 'email': serviceUsuario.alterarEmail(params, function(data){
                alert("Email alterado com sucesso");
            });break;
            case 'senha': serviceUsuario.alterarSenha(params, function(data){
                alert("Senha alterada com sucesso");
            });
        }

    };

    $scope.removerUsuario = function(){
        var params = {_id: $scope.usuarioDaSessao._id, senha: $scope.remover.usuario};

        serviceUsuario.removerUsuario(params, function(data){
            $cookieStore.put('logado', undefined);
            $location.path('/');
        });
    };

    $scope.abrirModalCadastro = function(size){
        var modalInstance = $modal.open({
            templateUrl: 'modalCadastro.html',
            controller: ModalInstanceCtrlCadastro,
            size: size,
            backdrop: true

        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

});

var ModalInstanceCtrlCadastro = function($scope, $modalInstance, $location, serviceUsuario, $cookieStore){

    $scope.novoUsuario = {nome:'', sobrenome:'', email:'', senha:''};

    $scope.inserirUsuario = function () {

        var usuario = $scope.novoUsuario;
        usuario.nome = usuario.nome.toLowerCase();
        usuario.sobrenome = usuario.sobrenome.toLowerCase();

        serviceUsuario.inserirUsuario(usuario, function(cb){
            $cookieStore.put('logado', cb);
            $location.path('/usuario');
            $modalInstance.close();
        });
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

};