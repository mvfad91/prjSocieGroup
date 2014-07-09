'use strict';

var redeSocialApp = angular.module('redeSocialApp', ['angularMoment','ui.bootstrap', 'ngCookies', 'angularFileUpload']);

angular.element(document).ready(function(){
    angular.bootstrap(document, ['redeSocialApp']);
});

redeSocialApp.config(['$routeProvider','$httpProvider', function($routeProvider, $httpProvider) {

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

  $routeProvider.when('/', {templateUrl: 'templates/login/login.html', controller: 'controleAutenticacao'});
  $routeProvider.when('/usuario', {templateUrl: 'templates/usuario/usuario2.html', controller: 'controlePerfil'});
  $routeProvider.when('/projeto', {templateUrl: 'templates/projeto/projeto.html', controller: 'controleProjeto'});
  $routeProvider.when('/erro', {templateUrl: 'templates/erro/paginaNaoExiste.html', controller: ''});
  $routeProvider.otherwise({redirectTo: '/erro'});
}]);
