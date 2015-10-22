'use strict';

/**
 * @ngdoc service
 * @name helloIonicApp.authInterceptor
 * @description
 * # authInterceptor
 * Factory in the helloIonicApp.
 */
angular.module('helloIonicApp')
  .factory('authInterceptor', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
