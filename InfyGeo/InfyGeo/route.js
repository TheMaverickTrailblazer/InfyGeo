var routerApp = angular.module('InfyGeo', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'index.html'
        })
        .state('people', {
            url: '/People',
            templateUrl: '/People/People.html'
        });

});

//routerApp.config(function ($routeProvider, $locationProvider) {
//    $routeProvider
//     .when('/people/', {
//         templateUrl: 'features/people/people.html',
//         controller: 'peopleController'
//     })
//});