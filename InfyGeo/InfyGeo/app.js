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
           .controller('HomeController', ['$scope', '$rootScope', function ($scope, $rootScope) {
               $scope.Title = "InfoGeo";
               $scope.Description = "Plaform to provide nearby features for Infosys employees who travel abroad.";
               $scope.Location = "Plainsboro";
               $scope.isLocationEditable = false;
               $rootScope.abc = "test abc";

               $scope.$watch('Location', function () {
                   //alert('hey, Location has changed!');
               });

               $scope.setLocation = function () {
                   $scope.isLocationEditable = false;
               }
               $scope.ChangeLocation = function () {
                   $scope.isLocationEditable = true;
               }

           }]).controller('PeopleController', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {

               $scope.Location = $scope.Location;

               $scope.$watch('$scope.Location', function () {
                   //alert('hey, Location has changed!');
               });

               $scope.NearbyTitle = "Nearby People";
               $scope.CompanionTitle = "Travel Companion";

               $http.get('Features/People/PeopleService.txt').success(function (data) {
                   $scope.People = data;
               });

               $http.get('Features/People/CompanionService.txt').success(function (data) {
                   $scope.Comapanions = data;
               });
           }]).controller('KeyInfoController', ['$scope', '$http', function ($scope, $http) {
               var location = $scope.Location;
               var url = "http://dev.api.ean.com/ean-services/rs/hotel/v3/list?cid=38998&apiKey=53s3gvvk29x99zvt54zmnnzh&minorRev=28&customerUserAgent=WEB_SITE&customerIpAddress=73.193.252.64&locale=en_US&currencyCode=USD&city=" + location + "&stateProvinceCode=NJ&countryCode=US";
               $http.get(url).
                                 success(function (data, status, headers, config) {
                                     // this callback will be called asynchronously
                                     // when the response is available
                                     $scope.hotels = data.HotelListResponse.HotelList.HotelSummary;

                                 }).
                                 error(function (data, status, headers, config) {
                                     // called asynchronously if an error occurs
                                     // or server returns response with an error status.
                                     alert('an error occured');
                                 });
           }]);