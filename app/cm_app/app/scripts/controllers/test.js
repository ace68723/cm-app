'use strict';

/**
 * @ngdoc function
 * @name helloIonicApp.controller:TestCtrl
 * @description
 * # TestCtrl
 * Controller of the helloIonicApp
 */
angular.module('helloIonicApp')
  .controller('TestCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
