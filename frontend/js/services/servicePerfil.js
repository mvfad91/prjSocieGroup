
var servidor = "http://localhost:3001";

redeSocialApp.factory('servicePerfil', function($http, $rootScope){

    var usuarioAtual = '';
    var listaUsuarios = {};

return {
    getPerfil: function(id, cb){
        $http.get(servidor + '/usuario/' + id).success(function(data){
            cb(data);
            usuarioAtual = data;
        });
    },
    getUsuarioAtual: function(){
        return usuarioAtual;
    },
    listarSeguidores: function(ids, cb){
        $http.post(servidor + '/getSeguidores', ids).success(function(data){
            cb(data);

        });
    },
    buscarUsuarios: function(param, cb){
        $http.post(servidor + '/buscarUsuario/nome', param).success(function(data){
            listaUsuarios = data;
            cb(data);
        });
    },
    alterarUsuario: function(param, cb){
      $http.put(servidor + '/alterar/usuario', param).success(function(data){
          cb(data);
      })
    },
    alterarImagem: function(params, cb){
        $http.post(servidor + '/alterar/imagem', params).success(function(data){
           cb(data);

        });
    },
    visitarUsuario: function(usuario){
        $rootScope.$broadcast('visitarUsuario', usuario);
    },
    seguirUsuario: function(id, cb){
        $http.post(servidor + '/addAmigo', id).success(function(data){
            cb(data);

        });

    }
}
});
