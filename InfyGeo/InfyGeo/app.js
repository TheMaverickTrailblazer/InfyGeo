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
           .controller('HomeController', ['$scope', 'LocationService', function ($scope, LocationService) {
               $scope.Title = "InfoGeo";
               $scope.Description = "Plaform to provide nearby features for Infosys employees who travel abroad.";
               $scope.Location = "Princeton";
               $scope.isLocationEditable = false;

               $scope.setLocation = function () {
                   $scope.isLocationEditable = false;
                   LocationService.changeLocation($scope.Location);
               }
               $scope.AllowChangeLocation = function () {
                   $scope.isLocationEditable = true;
               }

           }]).controller('PeopleController', ['$scope', '$http', 'LocationService', function ($scope, $http, LocationService) {

               //$scope.Location = "";
               $scope.$on('locationChanged', function () {
                   $scope.Location = LocationService.service.Location;
               });

               $scope.NearbyTitle = "Nearby People";
               $scope.CompanionTitle = "Travel Companion";

               $http.get('Features/People/PeopleService.txt').success(function (data) {
                   $scope.People = data;
               });

               $scope.filterPeople = function (person) {
                   //alert($scope.Location);
                   return person.Distance < 50 || person.Location == $scope.Location;
               };

               $http.get('Features/People/CompanionService.txt').success(function (data) {
                   $scope.Comapanions = data;
               });
           }]).controller('KeyInfoController', ['$scope', '$http', function ($scope, $http) {
               delete $http.defaults.headers.common['X-Requested-With'];
               var location = $scope.Location;
               $scope.searchHotels = function () {
                   var url = "http://dev.api.ean.com/ean-services/rs/hotel/v3/list?cid=38998&apiKey=53s3gvvk29x99zvt54zmnnzh&minorRev=28&customerUserAgent=WEB_SITE&customerIpAddress=73.193.252.64&locale=en_US&currencyCode=USD&city=" + location + "&stateProvinceCode=NJ&countryCode=US&arrivalDate=03/30/2015";
                   $http.get(url).
                                     success(function (data, status, headers, config) {
                                         // this callback will be called asynchronously

                                         // when the response is available
                                         var hotels = data.HotelListResponse.HotelList.HotelSummary;
                                         var url = 'UserProfile.txt';

                                         $http.get(url).success(function (data, status, headers, config) {

                                             var usr = data[0];

                                             var mxAmnt;
                                             switch (usr.JobBand) {
                                                 case "JL6":
                                                     maxAmnt = 400;
                                                     break;
                                                 case "JL5":
                                                     maxAmnt = 250;
                                                     break;
                                                 case "JL4":
                                                     maxAmnt = 150;
                                                     break;
                                                 default:
                                                     maxAmnt = 100;
                                                     break;
                                             }
                                             var newHotels = [];
                                             for (var i = 0; i < hotels.length; i++) {
                                                 var hotelPrice = hotels[i].highRate;

                                                 if (hotelPrice < maxAmnt && hotels[i].lowRate != 0) {
                                                     newHotels.push(hotels[i]);
                                                 }
                                             }

                                             for (var i = 0; i < 3; i++) {
                                                 if (i == 0) {
                                                     newHotels[i].Recommend = "25 Infoscians recommend this hotel.";
                                                     newHotels[i].Discount = "10% Discount available for Infoscians.";
                                                     newHotels[i].showDetails = true;
                                                 }
                                                 else if (i == 1) {
                                                     newHotels[i].Recommend = "5 Infoscians recommend this hotel.";
                                                     newHotels[i].Discount = "5% Discount available for Infoscians.";
                                                     newHotels[i].showDetails = true;
                                                 }
                                                 else if (i == 2) {
                                                     newHotels[i].Recommend = "55 Infoscians recommend this hotel.";
                                                     newHotels[i].Discount = "30% Discount available for Infoscians.";
                                                     newHotels[i].showDetails = true;
                                                 }
                                             }

                                             $scope.hotels = newHotels;

                                             $scope.showHotels = true;

                                             $scope.showSchools = false;

                                             $scope.showApartments = false;

                                         }).error(function (data, status, headers, config) {
                                         });


                                     }).
                                     error(function (data, status, headers, config) {
                                         // called asynchronously if an error occurs
                                         // or server returns response with an error status.
                                         alert('an error occured');
                                     });
               }

               $scope.searchSchools = function () {
                   var url = "UserProfile.txt";
                   $http.get(url).
                                     success(function (data, status, headers, config) {
                                         // this callback will be called asynchronously
                                         // when the response is available
                                         $scope.schools = [{ "school": { "schoolid": "25017", "schoolname": "Community Middle School", "zip": "08536", "address": "55 Grovers Mill Rd", "city": "Plainsboro", "districtid": "4015", "districtleaid": "3417700", "AYPResult": "yes", "AYPResultYear": "2011", "distance": 25017, "enrollment": { "total": 1235 }, "gradelevel": "Middle", "gradesserved": "6-8", "latitude": 40.3221245, "longitude": -74.5907059, "phonenumber": "(609) 716-5300", "schooldistrictname": "West Windsor-Plainsboro Regional School District", "schooltype": "Public", "state": "NJ", "studentteacherratio": { "total": 12 }, "website": null, "nces_id": "341770006012", "url": "http:\/\/schools.education.com\/schoolfinder\/us\/new-jersey\/plainsboro\/community-m-s-\/", "testrating_text": "Education.com TestRating 9", "testrating_image_large": "http:\/\/schools.education.com\/themes\/sky\/i\/schoolfinder\/images\/school-rating9.png", "testrating_image_small": "http:\/\/schools.education.com\/themes\/sky\/i\/schoolfinder\/images\/small-school-rating9.png", "testrating_year": "2011" } }, { "school": { "schoolid": "25019", "schoolname": "John V B Wicoff Elementary School", "zip": "08536", "address": "Plainsboro Rd", "city": "Plainsboro", "districtid": "4015", "districtleaid": "3417700", "AYPResult": "yes", "AYPResultYear": "2011", "distance": 25019, "enrollment": { "total": 465 }, "gradelevel": "Elementary", "gradesserved": "K-3", "latitude": 40.3319588, "longitude": -74.5965347, "phonenumber": "(609) 716-5450", "schooldistrictname": "West Windsor-Plainsboro Regional School District", "schooltype": "Public", "state": "NJ", "studentteacherratio": { "total": 15 }, "website": null, "nces_id": "341770003264", "url": "http:\/\/schools.education.com\/schoolfinder\/us\/new-jersey\/plainsboro\/john-v-b-wicoff-elementary-school\/", "testrating_text": "Education.com TestRating 10", "testrating_image_large": "http:\/\/schools.education.com\/themes\/sky\/i\/schoolfinder\/images\/school-rating10.png", "testrating_image_small": "http:\/\/schools.education.com\/themes\/sky\/i\/schoolfinder\/images\/small-school-rating10.png", "testrating_year": "2011" } }, { "school": { "schoolid": "25021", "schoolname": "Millstone River School", "zip": "08536", "address": "75 Grovers Mill Rd", "city": "Plainsboro", "districtid": "4015", "districtleaid": "3417700", "AYPResult": "no", "AYPResultYear": "2010", "distance": 25021, "enrollment": { "total": 889 }, "gradelevel": "Elementary", "gradesserved": "4-5", "latitude": 40.3255196, "longitude": -74.5946732, "phonenumber": "(609) 716-5500", "schooldistrictname": "West Windsor-Plainsboro Regional School District", "schooltype": "Public", "state": "NJ", "studentteacherratio": { "total": 15 }, "website": null, "nces_id": "341770006077", "url": "http:\/\/schools.education.com\/schoolfinder\/us\/new-jersey\/plainsboro\/millstone-river-school\/", "testrating_text": "Education.com TestRating 9", "testrating_image_large": "http:\/\/schools.education.com\/themes\/sky\/i\/schoolfinder\/images\/school-rating9.png", "testrating_image_small": "http:\/\/schools.education.com\/themes\/sky\/i\/schoolfinder\/images\/small-school-rating9.png", "testrating_year": "2011" } }, { "school": { "schoolid": "25023", "schoolname": "Town Center Elementary School-Plainsboro", "zip": "08536", "address": "700 Wyndhurst Dr", "city": "Plainsboro", "districtid": "4015", "districtleaid": "3417700", "AYPResult": "yes", "AYPResultYear": "2009", "distance": 25023, "enrollment": { "total": 664 }, "gradelevel": "Elementary", "gradesserved": "K-3", "latitude": 40.3355942, "longitude": -74.5842667, "phonenumber": "(609) 716-8330", "schooldistrictname": "West Windsor-Plainsboro Regional School District", "schooltype": "Public", "state": "NJ", "studentteacherratio": { "total": 16 }, "website": null, "nces_id": "341770000505", "url": "http:\/\/schools.education.com\/schoolfinder\/us\/new-jersey\/plainsboro\/town-center-elem-sch-at-plainsboro\/", "testrating_text": "Education.com TestRating 8", "testrating_image_large": "http:\/\/schools.education.com\/themes\/sky\/i\/schoolfinder\/images\/school-rating8.png", "testrating_image_small": "http:\/\/schools.education.com\/themes\/sky\/i\/schoolfinder\/images\/small-school-rating8.png", "testrating_year": "2011" } }, { "school": { "schoolid": "25025", "schoolname": "Wwindsor-Plainsboro North High School", "zip": "08536", "address": "90 Grovers Mill Rd", "city": "Plainsboro", "districtid": "4015", "districtleaid": "3417700", "AYPResult": "yes", "AYPResultYear": "2009", "distance": 25025, "enrollment": { "total": 1598 }, "gradelevel": "High", "gradesserved": "9-12", "latitude": 40.3240128, "longitude": -74.5997772, "phonenumber": "(609) 716-5100", "schooldistrictname": "West Windsor-Plainsboro Regional School District", "schooltype": "Public", "state": "NJ", "studentteacherratio": { "total": 14 }, "website": null, "nces_id": "341770000191", "url": "http:\/\/schools.education.com\/schoolfinder\/us\/new-jersey\/plainsboro\/west-windsor-plainsboro-hs-north\/", "testrating_text": "Education.com TestRating 9", "testrating_image_large": "http:\/\/schools.education.com\/themes\/sky\/i\/schoolfinder\/images\/school-rating9.png", "testrating_image_small": "http:\/\/schools.education.com\/themes\/sky\/i\/schoolfinder\/images\/small-school-rating9.png", "testrating_year": "2011" } }, { "school": { "schoolid": "110791", "schoolname": "Child Development Center At Bristol-myers Squibb", "zip": "08536", "address": "777 Scudders Mill Rd", "city": "Plainsboro", "districtid": "16578", "districtleaid": null, "AYPResult": null, "AYPResultYear": null, "distance": 110791, "enrollment": { "total": 99 }, "gradelevel": "Preschool,Elementary", "gradesserved": "PK,K", "latitude": 40.3426056, "longitude": -74.605278, "phonenumber": "(609) 897-3700", "schooldistrictname": "NJ Private Schools", "schooltype": "Private, Early Childhood Program\/Day Care Center", "state": "NJ", "studentteacherratio": { "total": 50 }, "website": null, "nces_id": "A0107181", "url": "http:\/\/schools.education.com\/schoolfinder\/us\/new-jersey\/plainsboro\/child-dev-ctr-bristol-myers\/", "testrating_text": "", "testrating_image_large": null, "testrating_image_small": null, "testrating_year": "" } }, { "school": { "schoolid": "234386", "schoolname": "Montessori Corner School At Princeton Meadows", "zip": "08536", "address": "666 Plainsboro Rd Building 2100", "city": "Plainsboro", "districtid": "16578", "districtleaid": null, "AYPResult": null, "AYPResultYear": null, "distance": 234386, "enrollment": { "total": 27 }, "gradelevel": "Preschool,Elementary", "gradesserved": "PK,K", "latitude": 40.3288956, "longitude": -74.576622, "phonenumber": "(609) 799-6668", "schooldistrictname": "NJ Private Schools", "schooltype": "Private, Montessori", "state": "NJ", "studentteacherratio": { "total": 3 }, "website": null, "nces_id": "A0302101", "url": "http:\/\/schools.education.com\/schoolfinder\/us\/new-jersey\/plainsboro\/montessori-corner-school-at-princeton-meadows\/", "testrating_text": "", "testrating_image_large": null, "testrating_image_small": null, "testrating_year": "" } }, { "school": { "schoolid": "234387", "schoolname": "Montessori Country Day School", "zip": "08536", "address": "72 Grovers Mill Rd", "city": "Plainsboro", "districtid": "16578", "districtleaid": null, "AYPResult": null, "AYPResultYear": null, "distance": 234387, "enrollment": { "total": 60 }, "gradelevel": "Preschool,Elementary", "gradesserved": "PK,K-5", "latitude": 40.3227272, "longitude": -74.5935822, "phonenumber": "(609) 799-7990", "schooldistrictname": "NJ Private Schools", "schooltype": "Private, Montessori", "state": "NJ", "studentteacherratio": { "total": 4 }, "website": null, "nces_id": "A0701528", "url": "http:\/\/schools.education.com\/schoolfinder\/us\/new-jersey\/plainsboro\/montessori-country-day-school\/", "testrating_text": "", "testrating_image_large": null, "testrating_image_small": null, "testrating_year": "" } }];

                                         $scope.showHotels = false;

                                         $scope.showSchools = true;

                                         $scope.showApartments = false;
                                     }).
                                     error(function (data, status, headers, config) {
                                         // called asynchronously if an error occurs
                                         // or server returns response with an error status.
                                         alert('an error occured');
                                     });
               }

               $scope.searchApartments = function () {
                   var searchLocation = $scope.Location;
                   $scope.showApartments = true;
                   $scope.showHotels = false;
                   $scope.showSchools = false;
                   var rad5Elem = document.getElementById("rad5");
                   var rad10Elem = document.getElementById("rad10");
                   var rad15Elem = document.getElementById("rad15");
                   var rad20Elem = document.getElementById("rad20");
                   var radius = 0;
                   radius = (rad5Elem.checked) ? 5 * 1.6 * 1000 : 0;
                   if (radius == 0)
                       radius = (rad10Elem.checked) ? 10 * 1.6 * 1000 : 0;
                   if (radius == 0)
                       radius = (rad15Elem.checked) ? 15 * 1.6 * 1000 : 0;
                   if (radius == 0)
                       radius = (rad20Elem.checked) ? 20 * 1.6 * 1000 : 0;

                   initialize(searchLocation, 'apartments', '', radius);
               }

           }]).controller('OfficeController', ['$scope', function ($scope) {
               searchLocation = $scope.Location;
               var keyword = '';
               var types = '';
               $scope.searchSSN = function () {
                   keyword = 'social+security+office';
                   types = ['local_government_office'];
                   initialize(searchLocation, keyword, types);
               }
               $scope.searchInfy = function () {
                   keyword = 'Infosys+Technologies+Ltd';
                   types = ['establishment'];
                   initialize(searchLocation, keyword, types);
               }
           }]).factory('LocationService', function ($rootScope) {
               var service = {};
               service.Location = "";

               service.changeLocation = function (value) {
                   this.Location = value;
                   $rootScope.$broadcast("locationChanged");
               }
               return service;
           });
