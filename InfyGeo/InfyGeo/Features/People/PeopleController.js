angular.module('InfyGeo', [])
.controller('PeopleController', ['$scope', '$http', 'LocationService', function ($scope, $http, LocationService) {

    //$scope.Location = "";
    $scope.$on('locationChanged', function () {
        $scope.Location = LocationService.service.Location;
    });

    $scope.NearbyTitle = "Nearby People";
    $scope.CompanionTitle = "Travel Companion";


    $http.get('Features/People/PeopleService.txt').success(function (data) {
        $scope.People = data;
    });


    $http.get('Features/People/CompanionService.txt').success(function (data) {
        $scope.Comapanions = data;
    });


    $scope.filterPeople = function (person) {

        return person.Distance < 50 || person.Location == $scope.Location;
    };

    $scope.showMap = function (city) {
        // alert(city);
        initialize(city, null, null, '', '', true);
    };
    $scope.showAllMap = function (city) {
        //alert('Trying to show all in map');
        var locationList = ['Plainsboro', 'Hopewell Township', 'Edison', 'Jersey City'];
        initializeMapLocation(locationList);
    };