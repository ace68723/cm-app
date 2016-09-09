'use strict';

angular.module('chanmao')
  .controller('UpdateCtrl', function($scope, 	$rootScope,$state,$location) {

    $scope.action = function() {
           $location.path("/login")
           	$rootScope.checkForUpdates();
        };


  })
