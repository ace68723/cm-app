'use strict';

angular.module('chanmao')
  .factory('authInterceptor', function (auth,alertService,version) {
    var authInterceptor = {}
    authInterceptor.request = function(config) {
        var method = config.method
        var token = auth.getToken();
        var isAuthenticated = auth.isAuthenticated()
        var res_code = auth.get_res_code()
        
        var url = config.url
        var get_port = url.split('/');
        var port = get_port[get_port.length -1]
        if(port == "Rrlist" && method == "GET"){
            var location = auth.get_location();
            if(location){
                config.headers.Userloc = location;
            }
           
        }
        // if(port == "loginwc" && method == "GET"){
            // config.headers.CmVersion = version;
           
        // }

        if(isAuthenticated){
            config.headers.Authortoken = token;
        }else if(res_code){
            config.headers.Rescode = res_code;
            config.headers.Authortoken = '';
        } 
        return config   
    },
    authInterceptor.response=function(response) {
        if(response.data.alert){
            var alert       = response.data.alert;
            var lv_message  = alert.message;
            var lv_title    = alert.title;
            var lv_btn      = alert.btn;
            alertService.alert(lv_message,lv_title,lv_btn)
        }
        // else if(response.data.update){
        //     var update      = response.data.update;
        //     var lv_message  = update.message;
        //     var lv_title    = update.title;
        //     var lv_btn1     = update.btn1;
        //     var lv_btn2     = update.btn2; 
        //     var link        = update.link;
        //     alertService.confirm(lv_message,lv_title,lv_btn1,lv_btn2)
        //         .then(function(result) {
        //             var btn_index = result
        //             console.log(btn_index)
        //             if(btn_index == 1){
                   
        //             }else if (btn_index == 2){
        //                 cordova.plugins.market.open(link)
        //             }
        //         })
        // }
        return response;
    }
    return authInterceptor
  });
