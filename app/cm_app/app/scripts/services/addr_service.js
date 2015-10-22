'use strict';

/**
 * @ngdoc service
 * @name helloIonicApp.addrService
 * @description
 * # addrService
 * Factory in the helloIonicApp.
 */
angular.module('helloIonicApp')
  .factory('addrService', function () {
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
