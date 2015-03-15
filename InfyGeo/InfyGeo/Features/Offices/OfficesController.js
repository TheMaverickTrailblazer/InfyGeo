angular.module('InfyGeo', []).controller('OfficeController', ['$scope', function ($scope) {
    searchLocation = $scope.Location;
    var keyword = '';
    var types = '';
    $scope.showOfficeResults = false;
    $scope.searchSSN = function () {
        $scope.showOfficeResults = false;
        keyword = 'social+security+office';
        types = ['local_government_office'];
        initialize(searchLocation, keyword, types);
        $scope.showOfficeResults = true;
    }
    $scope.searchInfy = function () {
        $scope.showOfficeResults = false;
        keyword = 'Infosys+Technologies+Ltd';
        types = ['establishment'];
        initialize(searchLocation, keyword, types);
        $scope.showOfficeResults = true;
    }
}]).factory('LocationService', function ($rootScope) {
    var service = {};
    service.Location = "";

    service.changeLocation = function (value) {
        this.Location = value;
        $rootScope.$broadcast("locationChanged");
    }
    return service;
})