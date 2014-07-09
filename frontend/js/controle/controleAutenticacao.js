
//controle referente ao login
redeSocialApp.controller('controleAutenticacao', function($scope, serviceLogin, $location, $cookieStore, $window){

    $scope.login = {email:'', senha:''};
    $scope.formLogin = true;

    $scope.entrar = function(){
       serviceLogin.realizarLogin($scope.login)
            .then(function(data){
                $cookieStore.put('logado', data);
                $location.path('/usuario');

            }, function(status){
                $window.alert("Usuario não encontrado \n verifique email e senha")
            });
    };

    $scope.sair = function(){
      $cookieStore.put('logado', undefined);
      $location.path('/');
    }

});
