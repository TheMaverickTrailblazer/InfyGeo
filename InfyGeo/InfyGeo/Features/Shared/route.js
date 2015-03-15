angular.module('InfyGeo', [])
           .config(function ($routeProvider) {
               $routeProvider.when('/', { templateUrl: 'Features/Shared/Menu.html' })
               $routeProvider.when('/people', { templateUrl: 'Features/People/People.html' })
               $routeProvider.when('/Offices', { templateUrl: 'Features/Offices/Offices.html' })
               $routeProvider.when('/keyinfo', { templateUrl: 'Features/keyinfo/keyinfo.html' })
               $routeProvider.when('/peopledata', { templateUrl: 'PeopleService.json' })

               $routeProvider.when('/sparsh', { templateUrl: 'Shared/Sparsh.html' })
               $routeProvider.when('/itravel', { templateUrl: 'Shared/iTravel.html' })
               $routeProvider.when('/payworld', { templateUrl: 'Shared/Payworld.html' })
           })