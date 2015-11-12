'use strict';

/**
 * @ngdoc service
 * @name smartDriverApp.authToken
 * @description
 * # authToken
 * Factory in the smartDriverApp.
 */
angular.module('chanmao')
  .factory('auth', ['$window','$injector','$location','API_URL',function ($window, $injector,$location,API_URL) {
    var storage = $window.localStorage;
    var auth = {};
    var cachedToken;
    var cachedLocation;
    var res_code;

   
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
        console.log('here')
        Wechat.isInstalled(function (installed) {
            alert("Wechat installed: " + (installed ? "Yes" : "No"));
            return installed;
        });
       
    };
    auth.doWechatAuth = function() {
        Wechat.auth("snsapi_userinfo", function (response) {
            alert(JSON.stringify(response));;
            res_code = response.code;
            auth.doAuth()

        }, function (reason) {
            alert("Failed: " + reason);
        });
    };
    auth.get_res_code = function() {
        return res_code;
    };
    
    auth.doAuth = function() {
        var $http =  $injector.get('$http')
        $http.get(API_URL + 'MobLogin/loginwc').
            success(function(data, status, headers,conifg) {
                console.log(data)
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
                
            })
            .error(function(data, status, headers,conifg) {
                console.log('error send res code')
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
                auth.save_location(location)
            }, function(err) {
            // error
        });
    };

    return auth
  }]);
