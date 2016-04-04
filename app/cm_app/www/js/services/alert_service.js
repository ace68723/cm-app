'use strict';

angular.module('chanmao')
    .factory('alertService', function ($q, $cordovaDialogs) {
        var alertService = {}

        alertService.alert = function(iv_message, iv_title , iv_btn) {
            return $q(function(resolve, reject) {
                var lv_message;
                var lv_title;
                var lv_btn;
                if(iv_message){
                    lv_message = iv_message
                }else{
                    reject('need message')
                }
                if(iv_title){
                    lv_title = iv_title
                }else{
                    lv_title = "馋猫醒请您"
                }

                if (iv_btn) {
                    lv_btn = iv_btn
                } else{
                    lv_btn = "确认"
                }
                $cordovaDialogs.alert(lv_message, lv_title, lv_btn)
                  .then(function(result) {
                    resolve(result);
                  });
            });
        };

        alertService.confirm = function(iv_message, iv_title , iv_btn1, iv_btn2) {
            return $q(function(resolve, reject) {
                var lv_message;
                var lv_title;
                var lv_btn1;
                var lv_btn2;
                if(iv_message){
                    lv_message = iv_message
                }else{
                    reject('need message')
                }

                if(iv_title){
                    lv_title = iv_title
                }else{
                    lv_title = "馋猫醒请您"
                }

                if (iv_btn1 && iv_btn2) {
                    lv_btn1 = iv_btn1
                    lv_btn2 = iv_btn2
                } else{
                    lv_btn1 = "取消"
                    lv_btn2 = "确认"
                }

                $cordovaDialogs.confirm(lv_message, lv_title,[lv_btn1,lv_btn2])
                  .then(function(result) {
                    resolve(result);
                  });
            });
        };

        return alertService;
    });
