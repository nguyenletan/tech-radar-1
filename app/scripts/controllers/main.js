'use strict';

angular.module('techRadarApp')
  .controller('MainCtrl', ['$scope', 'radarService', function ($scope, radarService) {
    $scope.radarData = radarService.radar.data;
    $scope.radarTechList = radarService.techList;
    $scope.groupActive = radarService.groupActive;
    $scope.setActive = function(status) {
      _.each($scope.radarData, function(status) { status.active = false; });
      status.active = true;
    };

    //console.log($scope.radarData[0]);
    $scope.setActive($scope.radarData[0]);

    $scope.addTech = function(category, tech) {
        if(tech) {
            category.technologies.push({label: tech});
            delete category.new
        }
    };

    $scope.removeTech = function(category, tech) {
        category.technologies = _.without(category.technologies, tech);
    };

    $scope.highlightTechLabel = function(tech, isHighlight){
      if(tech !== undefined && isHighlight !== undefined){
        tech.active =  isHighlight;
        $scope.technologies.each(function (d) {
          if(d.label === tech.label) {
            d.active = isHighlight;
            $scope.redrawTechCircles($scope.technologies, true);
          }
        });
      }
    }



  /*  $scope.$watch('groupActive' ,function(data){

      return;
    }, true);*/
    /*$scope.$watch('radarData', function(data){
      if(!data) return;
      $scope.activeCategory =  _.findWhere(_.flatten(_.pluck(data, 'categories')), {active: true});
      $scope.activeStatus = _.find(data, function(status){
        return _.indexOf(status.categories, $scope.activeCategory) >= 0;
      });
    }, true);*/

  }]);
