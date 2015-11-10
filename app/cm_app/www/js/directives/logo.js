'use strict';

/**
 * @ngdoc directive
 * @name cmAppApp.directive:logo
 * @description
 * # logo
 */
angular.module('chanmao')
  .directive('logoMockup', function() {
  return {
    restrict: 'E',
    compile: function(tElement, tAttr) {
      return function(scope, element) {
        element.replaceWith(' <style>.path{stroke-dasharray: 1800 100000 ; animation: dash 3s linear forwards; -webkit-animation: dash 3s linear forwards;}@keyframes dash{from{stroke-dashoffset: -7000;}to{stroke-dashoffset: 0;}}@-webkit-keyframes dash{from{stroke-dashoffset: -7000;}to{stroke-dashoffset: 0;}}</style><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="300px" viewBox="490 300 1300 1300" enable-background="new 0 0 500 500" xml:space="preserve"><path class="path" fill="none" stroke="#fdd910" stroke-width="25" stroke-miterlimit="10" d="M1343,887.7c-3.7,41-28.3,89.7-90.9,136.1c-63.1,46.9-134.5,54.7-177.5,54.2c-46.7-0.5-141.7-24.2-193.7-79.6C830,944,816,872.5,818.2,819c2-49.5,23.8-181.9,30.1-219.6c0.8-4.7,6.2-7,10.2-4.3l81.7,56.2c3.6,2.5,8.1,2.9,12.1,1.2c10.3-4.4,31.8-13,54.3-18.2c26.5-6.1,54.3-9.9,66.7-10.4c22.5-0.8,54,2.1,82.2,7.9c25.9,5.3,49,15,59.9,19.9c4.2,1.9,9,1.5,12.8-1.1l81.6-56.4c3.3-2.3,7.8-0.2,8.3,3.7c0,0,44.2,335.7,52.6,448.7c-62.5,93.1-168.2,154.3-288.2,154.3c-191.9,0-347.5-156.7-347.5-350c0-14.1-8.6-25.5-19.2-25.5c-10.6,0-19.2,13.4-19.2,27.5c0.1,213.1,172.9,386.9,386,386.9c213.2,0,386-172.8,386-386s-172.8-386-386-386c-87.9,0-168.9,29.4-233.8,78.8c-2.2,1.5-4.4,3-4.4,3c-169.5,114.9-369.9,114.5-448.1-0.8"/></svg> ');
      }
    }
  }
}) 
