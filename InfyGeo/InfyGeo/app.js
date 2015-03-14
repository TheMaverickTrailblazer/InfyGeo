angular.module('InfyGeo', [])
           .config(function ($routeProvider) {
               $routeProvider.when('/', { templateUrl: 'Features/Shared/Menu.html' })
               $routeProvider.when('/people', { templateUrl: 'Features/People/People.html' })
               $routeProvider.when('/Offices', { templateUrl: 'Features/Offices/Offices.html' })
               $routeProvider.when('/keyinfo', { templateUrl: 'Features/keyinfo/keyinfo.html' })
           })
           .controller('HomeController', ['$scope', function ($scope) {
               $scope.Title = "InfoGeo";
               $scope.Description = "Geographical features for Infosys employees";
               $scope.Location = "Plainsboro";

           }]).controller('PeopleController', ['$scope', function ($scope) {
               $scope.People = [
                 { Name: 'Karthik Jambulingam', City: "Plainsboro", Distance: '10', Email: "karthik_j02@infosys.com" },
                 { Name: 'Amit Desai', City: "Hopewell", Distance: '30', Email: "Amit.Desai@infosys.com" },
                 { Name: 'Mahalingam Kumaresan', City: "New York", Distance: '50', Email: "Mahalingam_k03@infosys.com" },
                 { Name: 'Abhilash Nair', City: "Jersey City", Distance: '40', Email: "Abhilash.Nair@infosys.com" }
               ];

               $scope.Title = "Nearby People";
           }]);