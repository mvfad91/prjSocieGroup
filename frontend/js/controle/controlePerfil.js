
redeSocialApp.controller('controlePerfil', function($scope, serviceSocketIo, serviceProjeto, $location, $modal, $rootScope, serviceLogin, servicePerfil, serviceComentario, $log, $modal, $cookieStore){

    $scope.menuPerfil = true;
    $scope.submenuPerfil = true;
    $scope.templatesPerfil = '';
    $scope.templatesConfig = '';
    $scope.usuarioDaSessao = {_id: '', nome: '', sobrenome: '', amigos: '' };
    $scope.perfilAtual = {_id: '', nome: '', sobrenome: '', amigos: '' };

    $scope.trocarTemplate = function(param){
        switch (param){
            case 'cfg': $scope.templatesPerfil = 'cfg';
                $scope.perfilAtual = $scope.usuarioDaSessao;break;
            case 'projetos': $scope.templatesPerfil = 'projetos';
        }
    };

    function iniciar() {

        if ($cookieStore.get('logado') === undefined) {
            $location.path('/');
        } else {
            var usuario = $scope.usuarioDaSessao = $cookieStore.get('logado');
            $scope.usuario = {_id: usuario._id, nome: usuario.nome, sobrenome: usuario.sobrenome, email: '', senha: '', novaSenha: '' };
        }

        $scope.perfilAtual = servicePerfil.getUsuarioAtual();

        if ($scope.perfilAtual === '') {
            carregarPerfil($scope.usuarioDaSessao._id);
        } else {
            $scope.perfilAtual.img = $cookieStore.get('logado').img;
            $scope.botaoAlterarFoto = true;
            buscarSeguidores();
        }
    }

    function buscarSeguidores(){
        servicePerfil.listarSeguidores($scope.perfilAtual.amigos, function(data){
            $scope.listaAmigos = data;
        });
    }

    function carregarPerfil(id){
        servicePerfil.getPerfil(id, function(data){
            $scope.perfilAtual = data;

            if(data._id === $scope.usuarioDaSessao._id){
                $scope.botaoAlterarFoto = true;
                $scope.botaoSeguir = false;
            }else{
                $scope.botaoAlterarFoto = false;
                $scope.botaoSeguir = verificarBotao();
            }

            serviceComentario.listarComentarios();

            buscarSeguidores();

        });

        document.getElementById('tpl-principal-esq').style.display = "block";
        document.getElementById('seguindo').style.display = "block";
        $scope.templatesPerfil = 'recados';

    }

    $scope.seguirPerfil = function(){
        var id = {id: '', idSessao: $scope.usuarioDaSessao._id};

        id.id = $scope.perfilAtual._id;

        servicePerfil.seguirUsuario(id, function(data){
            if(data)
            {
                alert("Amigo adicionado com sucesso!");
                $scope.botaoSeguir = false;
            }else{
                alert("erro");
            }
        });
    };

    iniciar();

    $scope.alterarUsuario = function(param){
        var params = $scope.usuario;

        switch (param){
            case 'publico': servicePerfil.alterarUsuario(params, function(data){
                $scope.perfilAtual.nome = params.nome;
                $scope.perfilAtual.sobrenome = params.sobrenome;
                $cookieStore.put('logado', $scope.perfilAtual)
            });break;
        }

    };

    function verificarBotao(){
        var seguindoOk = true;
        var amigos = $scope.usuarioDaSessao.amigos;

        for (var i = 0; i<= amigos.length; i++){
            if(amigos[i] === $scope.perfilAtual._id){
                seguindoOk = false;

            }
        }
        return seguindoOk;
    }

    $scope.busca = {texto: ''};
    $scope.buscar = function(){

        var parametro = {nome: $scope.busca.texto};
        parametro.nome = parametro.nome.toLowerCase();
        $scope.consultaNomeEmail = true;

        servicePerfil.buscarUsuarios(parametro, function(data){
            $scope.listaConsulta = data;
            document.getElementById('tpl-principal-esq').style.display = "none";
            document.getElementById('seguindo').style.display = "none";
            $scope.templatesPerfil = 'consulta';

        });
    };

    $scope.buscarPorEmail = function(){
        var parametro = {email: $scope.busca.texto};
        $scope.consultaNomeEmail = true;

        servicePerfil.buscarUsuarios(parametro, function(data){
            $scope.listaConsulta = data;
            document.getElementById('tpl-principal-esq').style.display = "none";
            $scope.templatesPerfil = 'consulta';
        });
    };

    $scope.buscarProjetosPorNome = function(){
        var parametro = $scope.busca.texto;
        $scope.consultaProjeto = true;
        serviceProjeto.buscarProjetosPorNome(parametro, function(data){
            $scope.listaConsulta = data;
        })
    };

    $scope.visitarPerfil = function(usuario){
        carregarPerfil(usuario);
    };

    $scope.listaNotify = [];
    serviceSocketIo.on('feed', function(data){
        $scope.listaNotify.unshift(data);
        $scope.$digest();
    });

    $scope.verProjeto = function(id){
        $cookieStore.put('projetoAtual', id);
        $location.path("/projeto");
    };

    $rootScope.$on('visitarUsuario', function(event, data){
        carregarPerfil(data);
    });

    $scope.openModalEditarPerfil = function () {
        var modalInstance = $modal.open({
            templateUrl: 'modalEditarPerfil.html',
            controller: ModalInstanceCtrlPerfil,
            backdrop: true

        });
        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.trocarFoto = function () {
        var modalInstance = $modal.open({
            templateUrl: 'modalFotoUsuario.html',
            controller: ModalInstanceCtrlUsuario,
            backdrop: true
        });
        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

});

var ModalInstanceCtrlUsuario = function ($scope, $modalInstance, $cookieStore, serviceComentario, $upload, $route, servicePerfil) {


    $scope.ok = function () {
        $modalInstance.close();
        $route.reload();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    var usuario = $cookieStore.get('logado');

    $scope.onFileSelect = function($files) {

        for (var i = 0; i < $files.length; i++) {
            var image = $files[i];

            $scope.upload = $upload.upload({
                url: 'http://localhost:3001/upload/fotoUsuario',
                method: 'POST',
                file: image

            }).progress(function(evt) {
                    $scope.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                }).success(function(data, status, headers, config) {
                    usuario.img = data.img;
                    $cookieStore.put('logado', usuario);

                    servicePerfil.alterarImagem(usuario, function(){

                    });
                    serviceComentario.alterarImagem(usuario, function(){

                    });

                });
        }

    }


};
