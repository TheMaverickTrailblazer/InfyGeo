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
           .controller('HomeController', ['$scope', function ($scope) {
               $scope.Title = "InfoGeo";
               $scope.Description = "Plaform to provide nearby features for Infosys employees who travel abroad.";
               $scope.Location = "Plainsboro";
               $scope.isLocationEditable = false;

               $scope.setLocation = function () {
                   $scope.isLocationEditable = false;
               }
               $scope.ChangeLocation = function () {
                   $scope.isLocationEditable = true;
               }

           }]).controller('PeopleController', ['$scope', '$http', function ($scope, $http) {

               $scope.Location = $scope.Location;

               $scope.NearbyTitle = "Nearby People";
               $scope.CompanionTitle = "Travel Companion";

               $http.get('Features/People/PeopleService.txt').success(function (data) {
                   $scope.People = data;
               });

           }]).controller('PeopleController', ['$scope', function ($scope) {
               $scope.People = [
                 { Name: 'Karthik Jambulingam', City: "Plainsboro", Distance: '10', Email: "karthik_j02@infosys.com" },
                 { Name: 'Amit Desai', City: "Hopewell", Distance: '30', Email: "Amit.Desai@infosys.com" },
                 { Name: 'Mahalingam Kumaresan', City: "New York", Distance: '50', Email: "Mahalingam_k03@infosys.com" },
                 { Name: 'Abhilash Nair', City: "Jersey City", Distance: '40', Email: "Abhilash.Nair@infosys.com" }
               ];

               $scope.Title = "Nearby People";
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
           }])
;