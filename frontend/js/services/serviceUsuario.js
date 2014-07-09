//servico responsável pelo cadastro de novos usuarios
var servidor = "http://localhost:3001";

redeSocialApp.service('serviceUsuario', function($http){

    var usuarioDaSessao = "false";

    return {
        getUsuarioDaSessao: function(){
            return usuarioDaSessao;
        },
        alterarEmail: function(param, cb){
            $http.put(servidor + '/alterar/email', param).success(function(data){
                cb(data);
            });
        },
        alterarSenha: function(param, cb){
            $http.put(servidor + '/alterar/senha', param).success(function(data){
                cb(data);
            });
        },
        removerUsuario: function(params, cb){
            $http.post(servidor + '/remover', params).success(function(data){
                cb(data);
                usuarioAtual = '';
            });
        },
        inserirUsuario: function(param, cb){
            $http.post(servidor + '/newUser', param).success(function(data){
                cb(data);
                usuarioDaSessao = data;
            });
        }
    }
});
