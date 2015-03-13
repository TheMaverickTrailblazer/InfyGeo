
angular.module('InfyGeo', [])
  .controller('HomeController', ['$scope', function ($scope) {

      $scope.Title = "InfoGeo";
      $scope.Description = "Geographical features for Infosys employees";

      $scope.goToPeople = function () {

          alert('Clicked!');
          //$location.path('/Features/People/People.html');
      };

  }]);