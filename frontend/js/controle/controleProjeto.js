
//controle básico apenas para listar os projetos de um usuario
redeSocialApp.controller('controleProjetoListar', function($scope, serviceProjeto, servicePerfil, $modal, $cookieStore, $log, $location){

    var usuarioAtual = servicePerfil.getUsuarioAtual();

    if(usuarioAtual === ''){
        usuarioAtual = $cookieStore.get('logado');
    }

    serviceProjeto.listarProjetosPorId(usuarioAtual._id, function(data){
       $scope.listaProjetos = data;
    });

    var socket = io.connect('http:localhost:3001/novoProjeto');
    var room = $cookieStore.get('logado')._id;

    socket.on('connect', function(){
        socket.emit('room', room);
    });

    socket.on('listarPrj', function(projeto){
        $scope.listaProjetos.unshift(projeto);
    });

    $scope.verProjeto = function(id){
            $cookieStore.put('projetoAtual', id);
            $location.path("/projeto");
    };

    //modal cadastro projeto
    $scope.open = function () {

        var modalInstance = $modal.open({
            templateUrl: 'modalNovoProjeto.html',
            controller: ModalInstanceCtrlProjeto,
            backdrop: true
        });
        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

});

//controle principal do projeto
redeSocialApp.controller('controleProjeto', function($scope, serviceProjeto, serviceComentario, $cookieStore, $log, $modal){

    $scope.menuProjeto= true;
    $scope.submenuProjeto= true;
    $scope.usuarioDaSessao = $cookieStore.get('logado');
    var idProjeto = $cookieStore.get('projetoAtual');


    //definição do modelo
    $scope.projeto = {titulo: '',
        descricao: '',
        time: '',
        img: '',
        idUsuario:'',
        autor: {
            nome: '',
            sobrenome: ''
        },
        arquivos: {nome: '',
            tipo: '',
            time: ''
        }
    };

    $scope.projetos = '';
    $scope.recado = {id: '', texto: '', nomeUsuario:'', sobrenomeUsuario: '', img:'', idPerfil:'', time:''};
    $scope.projetoAtual = {};

    $scope.trocarTemplate = function (pagina){
        $scope.templatesProjeto = pagina;
    };

    function verificarBotao(ids){
        var aux = true;

        for(var i = 0; i <= ids.length; i++){
            if(ids[i] === $scope.usuarioDaSessao._id){
                aux = false;
            }
        }
        return aux;
    }

    serviceProjeto.buscarProjetosById(idProjeto, function(data){

        $scope.projetoAtual = data;
        $scope.botaoSeguirPrj = verificarBotao(data.seguidores);
        console.log($scope.botaoSeguirPrj);

        serviceProjeto.buscarParticipantes(data.seguidores, function(data){
            $scope.listaParticipantes = data;

        });

    });

    $scope.seguirProjeto = function(){
        serviceProjeto.seguirProjeto($scope.projetoAtual._id, function(data){
            alert("seguindo!");
            $scope.botaoSeguirPrj = false;
            $scope.listaParticipantes.unshift($scope.usuarioDaSessao);
        });
    };

    $scope.openModalArquivo = function () {

        var modalInstance = $modal.open({
            templateUrl: 'modalEnviarArquivo.html',
            controller: ModalInstanceCtrlArquivo,
            backdrop: true,
            resolve:{
                titulo: function(){
                    return $scope.projetoAtual;
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

var ModalInstanceCtrlProjeto = function ($scope, $modalInstance, $route, $log, serviceProjeto, $cookieStore) {

   var socket = io.connect('http:localhost:3001/novoProjeto');
   var room = $cookieStore.get('logado')._id;

    socket.on('connect', function(){
        socket.emit('room', room);
    });

    $scope.projeto = {titulo: '',
        descricao: '',
        idUsuario: $cookieStore.get('logado')._id,
        autor:{
            nome: $cookieStore.get('logado').nome,
            sobrenome: $cookieStore.get('logado').sobrenome
        }
     };


    $scope.salvarProjeto = function(){
        var prj = $scope.projeto;
        serviceProjeto.salvarProjeto(prj,function(data){
            socket.emit('listarPrj', room, data);
            $modalInstance.close();

        });
    };

};


