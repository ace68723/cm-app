'use strict';

angular.module('chanmao')
  .factory('authInterceptor', function (auth,loadingService) {
    var authInterceptor = {}
    authInterceptor.request = function(config) {
        var method = config.method
        var token = auth.getToken();
        var isAuthenticated = auth.isAuthenticated()
        var res_code = auth.get_res_code()
        
        var url = config.url
        var get_port = url.split('/');
        var port = get_port[get_port.length -1]
        // console.log(config)
        if(port == "Rrlist" && method == "GET"){
            var location = auth.get_location();
            if(location){
                 console.log(location)
                 config.headers.Userloc = location;
            }
           
        }

        if(isAuthenticated){
            config.headers.Authortoken = token;
        }else if(res_code){
            config.headers.Rescode = res_code;
            config.headers.Authortoken = '';
        } 
        return config   
    },
    authInterceptor.response=function(response) {
       
        return response;
    }
    return authInterceptor
  });
