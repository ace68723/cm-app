'use strict';

/**
 * @ngdoc service
 * @name helloIonicApp.loadingService
 * @description
 * # loadingService
 * Factory in the helloIonicApp.
 */
angular.module('chanmao')
  .factory('loadingService', ['$injector','$window',function ($injector,$window) {
    var loadingService = {}
    var storage = $window.localStorage;
    var cachedTime;
    
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

    loadingService.setTime = function(time) {
        cachedTime = time;
        storage.setItem('last_time', time);
    };
    loadingService.getTime = function() {
        if(!cachedTime)
            cachedTime = storage.getItem('last_time');
        return cachedTime;
    };
    loadingService.reLoading = function() {
        if (!loadingService.getTime()) {
            console.log('44')
            var now =  Date.now()
            console.log('55',now)
        }else{
            var now = Date.now()
            console.log('55',now)
        }
    };

    return loadingService
  }]);
