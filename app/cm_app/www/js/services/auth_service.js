'use strict';

/**
 * @ngdoc service
 * @name smartDriverApp.authToken
 * @description
 * # authToken
 * Factory in the smartDriverApp.
 */
angular.module('chanmao')
  .factory('auth', ['$q','$window','$injector','$location','$cordovaDevice','alertService','loadingService','API_URL','version',
    function ($q,$window, $injector,$location,$cordovaDevice,alertService,loadingService,API_URL,version) {
    
    var storage = $window.localStorage;
    var auth = {};
    var cachedToken;
    var cachedLocation;
    var cachedChannel;
    var res_code;

    var version     = version;
    
    auth.setToken = function(token) {
        cachedToken = token;
        storage.setItem('userToken', token);
    };
    auth.getToken = function() {
        if(!cachedToken)
            cachedToken = storage.getItem('userToken');
        return cachedToken;
    };
    auth.isAuthenticated = function() {
        return !!this.getToken();
    };
    auth.removeToken = function() {
        storage.removeItem('userToken');
        cachedToken = null;
    };
    auth.isWechatInstalled = function() {
        var deferred = $q.defer();

        Wechat.isInstalled(function (installed) {
            deferred.resolve(installed);
        });
        
        return deferred.promise;
       
    };
    auth.doWechatAuth = function() {
        loadingService.showLoading()
        Wechat.auth("snsapi_userinfo", function (response) {
            // alert(JSON.stringify(response));;
             console.log('get')
            res_code = response.code;
            auth.doAuth()

        }, function (reason) {
            loadingService.hideLoading()
            alertService.alert(reason,"#_#失败了");
            console.log('error',reason)
        });
    };
    auth.get_res_code = function() {
        return res_code;
    };
    
    auth.doAuth = function() {
        var $http =  $injector.get('$http')
        var uuid        = $cordovaDevice.getUUID();
        var os_model    = $cordovaDevice.getModel()
        var os_platfrom = $cordovaDevice.getPlatform();
        var os_version  = $cordovaDevice.getVersion();

        // $http.get(API_URL + 'MobLogin/loginwc').
        //     success(function(data, status, headers,conifg) {
        //         // console.log(data)
        //         if(data.result == 1){
        //             if(data.token){
        //                 auth.setToken(data.token)
        //             }
        //             $location.path('/tab/history')
        //         }else{
        //             console.log('remove token')
        //             auth.removeToken(); 
        //             $location.path('/login')
        //         }

        //         loadingService.hideLoading()
                
        //     })
        //     .error(function(data, status, headers,conifg) {
        //         console.log('error send res code')
        //         loadingService.hideLoading()
        //     });

        $http({
          method: 'GET',
          url: API_URL + 'MobLogin/loginwc',
          headers: {
           'Cmversion': version,
           'Cmuuid':uuid,
           'Cmos':os_model+" | " +os_platfrom +" | " +os_version
         },
        }).then(function successCallback(response) {
             // console.log(data)
                var data = response.data
                if(data.result == 1){
                    if(data.token){
                        auth.setToken(data.token)
                    }
                    $location.path('/tab/history')
                }else{
                    console.log('remove token')
                    auth.removeToken(); 
                    $location.path('/login')
                }

                loadingService.hideLoading()
          }, function errorCallback(response) {
            console.log('error send res code')
            loadingService.hideLoading()
          });

    }
    auth.save_location = function(location) {
        cachedLocation = location;
        storage.setItem('userLocation', location);
    };
    auth.get_location = function() {
        if(!cachedLocation)
            cachedLocation = storage.getItem('userLocation');
        return cachedLocation;
    };
    auth.get_cur_position = function() {
        console.log('get position')
        var  $cordovaGeolocation =  $injector.get('$cordovaGeolocation')
        var posOptions = {timeout: 10000, enableHighAccuracy: false};
        
        $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {
                var lat  = position.coords.latitude
                var long = position.coords.longitude
                var location = lat+','+long
                console.log('location',location)
                auth.save_location(location)
            }, function(error) {
            // error
            console.log('postion error',error)
        });
    };
    
    auth.setChannel = function(channel) {
        cachedChannel = channel;
        storage.setItem('channel', channel);
    };
    auth.getChannel = function() {
        if(!cachedChannel)
            cachedChannel = storage.getItem('channel');
        return cachedChannel;
    };
    return auth
  }]);
