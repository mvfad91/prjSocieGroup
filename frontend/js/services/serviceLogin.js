// Servico responsável pelo login

var servidor = "http://localhost:3001";


redeSocialApp.factory('serviceLogin', function($http, $q){

    var usuarioDaSessao = "false";

   return {
       realizarLogin: function(usuario, cb){
           var deferred = $q.defer();

               $http.post(servidor + '/login', usuario).success(function(data){
                   deferred.resolve(data);
                   console.log("ta no success");

               }).error(function(data, status, headers, config){
                      deferred.reject(status);
                       console.log("ta no error");
                   });

           return deferred.promise;
       },
       getUsuarioDaSessao: function(){
           return usuarioDaSessao;
       }

   }
});
