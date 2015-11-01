'use strict';

angular.module('chanmao')
    .controller('WatchLocation', function($scope, $rootScope,$location) {
        $rootScope.$on('$locationChangeSuccess', function(event){
                var url = $location.url(),
                    params = $location.search();
                    console.log(url)
        })
    })