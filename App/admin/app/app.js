var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
	when('/bolas', {
      title: 'Bolas',
      templateUrl: 'partials/bolas.html',
      controller: 'bolasCtrl'
    }).
    when('/', {
      title: 'Personas',
      templateUrl: 'partials/personas.html',
      controller: 'personasCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });;
}]);
    