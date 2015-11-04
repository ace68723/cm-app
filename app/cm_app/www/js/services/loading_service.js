'use strict';

/**
 * @ngdoc service
 * @name helloIonicApp.loadingService
 * @description
 * # loadingService
 * Factory in the helloIonicApp.
 */
angular.module('chanmao')
  .factory('loadingService', ['$injector',function ($injector) {
    var loadingService = {}
    loadingService.showLoading = function() {
        var $ionicLoading = $injector.get('$ionicLoading')
        $ionicLoading.show({
            template: '<img src="./img/chanmao_logo.gif"style="height: 10%;"> </br>快到碗里来...'
        });
    };
    loadingService.showUpdate = function() {
        var $ionicLoading = $injector.get('$ionicLoading')
        $ionicLoading.show({
            template: '<img src="./img/chanmao_logo.gif"style="height: 10%;"> </br>正在更新中...</br>{{prog}}'
        });
    };
    loadingService.hideLoading = function() {
        var $ionicLoading = $injector.get('$ionicLoading')
        $ionicLoading.hide();
    };
    return loadingService
  }]);
