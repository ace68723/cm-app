'use strict';

/**
 * @ngdoc directive
 * @name cmAppApp.directive:lHttp
 * @description
 * # lHttp
 */
angular.module('CmApp')
  .directive('lHttp', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the lHttp directive');
      }
    };
  });
