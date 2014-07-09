
var servidor = "http://localhost:3001";

redeSocialApp.service('serviceProjeto', function($http, $rootScope){

    var projeto = "";

    return{
        listarProjetosPorId: function(id, cb){
            $http.get(servidor + '/projetos/'+ id).success(function(data){
                cb(data);
            });
        },
        buscarProjetosById: function(id, cb){
            $http.get(servidor + '/projeto/' + id).success(function(data){
                cb(data);
            });
        },
        buscarProjetosPorNome: function(param, cb){
            $http.get(servidor + '/getProjetos/' + param).success(function(data){
                cb(data);
            });
        },
        buscarParticipantes: function(seguidores, cb){
            $http.post(servidor + '/seguidores', seguidores).success(function(data){
                cb(data);
            });
        },
        salvarProjeto: function(prj, cb){
            $http.post(servidor + '/projeto', prj).success(function(data){
                cb(data);
            });
        },
        mostrarArquivos: function(projeto, cb){
            $http.post('/arquivos', projeto).success(function(data){
                cb(data);
            });
        },
        seguirProjeto: function(projeto, cb){
            $http.post('/projeto/seguir/' + projeto).success(function(data){
                cb(data);
            });
        },
        notificar: function(prj, dono){
            var projeto = prj._id;
            var usuario = {id: dono._id, nome: dono.nome + " " + dono.sobrenome};
            var notificacao = {texto: "postou um novo projeto"};
            $rootScope.$broadcast('notificarNovoProjeto', notificacao);
        }

    }

});
