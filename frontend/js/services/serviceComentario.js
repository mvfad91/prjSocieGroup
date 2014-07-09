var servidor = "http://localhost:3001";

redeSocialApp.service('serviceComentario', function($http, $rootScope){

    var comentarios = [];

    return {
        getComentarios: function(usuario, cb){
            $http.get(servidor + '/recado/'+ usuario).success(function(data){//mexi aqui
                cb(data);
                comentarios = data;
            });
        },
        salvarComentario: function(id, recado, cb){
            $http.post(servidor + '/recado/'+ id, recado).success(function(data){
                cb(data);
            });
        },
        getComentsService: function(){
          return comentarios;
        },
        listarComentarios: function(){
            $rootScope.$broadcast('pedido');
        },
        visitarUsuario: function(usuario){
            $rootScope.$broadcast('visitarUsuario', usuario);
        },
        alterarImagem: function(params, cb){
            $http.post(servidor + '/alterar/recado', params).success(function(data){
                cb(data);
            });
        }
    }
});
