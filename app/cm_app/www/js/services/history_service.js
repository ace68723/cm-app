'use strict';

/**
 * @ngdoc service
 * @name helloIonicApp.loadingService
 * @description
 * # loadingService
 * Factory in the helloIonicApp.
 */
angular.module('chanmao')
  .factory('HistoryService', function($http, $q, $state,$location,$window,$rootScope,$ionicScrollDelegate,auth,scrollService,loadingService,alertService,API_URL) {
    var HistoryService = {};
    var lv_oid;
    var lv_last_oid;
    var la_available;
    HistoryService.load = function($scope, mode) {
        var channel     = auth.getChannel()
        var eo_data     = {};
        var oid;
        var last_oid;
        eo_data.channel = channel;

      $http.post(API_URL+'MobOrder10/historylist', eo_data)
      .success(function(data, status, headers, config) {
            la_available = data.available
            if(data.current){
                lv_oid       = data.current.oid;
            }

            $scope.$evalAsync(function() {
                console.log(data)
                if(data.current){
                    $scope.current          = data.current;
                    $scope.available        = data.available;
                    $scope.unavailable_dish = data.unavailable;
                    $scope.rid              = data.current.rid;
                    var rrname              = data.current.rrname.split('(')[0]
                    var rrarea              = data.current.rrname.split('(')[1].split(')')[0]
                    $scope.current.rrname   = rrname
                    $scope.current.rrarea   = rrarea
                    $scope.current.uaddr    = data.current.uaddr.split(',')[0]

                }else if(!data.current){
                    $scope.current          = null;
                    $scope.available        = null;
                    $scope.rid              = null;
                }
                $scope.orders       = data.historylist;

            });
                if (mode == 1){
                    setTimeout(function() {
                        $scope.$broadcast('scroll.refreshComplete');
                    }, 1000);
                };

                if(data.current){
                  change_status($scope);
                  if(data.current.status == '5'){
                      if(lv_last_oid !== lv_oid || lv_last_oid == undefined){
                          var unavailable_dish = [];
                          var message = "";;
                          var count = 0;
                          _.forEach(data.unavailable, function(dish) {

                                  count += 1;
                                  unavailable_dish.push(dish)
                                  message += count + ". " + dish.ds_name + ';';
                                  console.log(message)
                          })
                          $location.path('/tab/history')
                          alertService.alert(message,"@_@没菜了")
                          lv_last_oid = lv_oid;
                      }

                  }
                }
           }).error(function(data, status) {
              $rootScope.noNetwork();
           }).then(function(){
              setTimeout(function() {
                     loadingService.hideLoading()
              }, 1500);


           });

    };

    HistoryService.recover = function($scope) {
       window.localStorage.setItem("sv_rid", $scope.rid);
       window.localStorage.setItem("sa_dishes", JSON.stringify($scope.available));

       window.location.assign('#/tab/order')
       setTimeout(function () {
           window.location.assign('#/tab/order/menu/' + $scope.rid)
       })
    };

    HistoryService.send_sms = function(oid) {
        $http({
            method: 'post',
            url: API_URL+'/MobOrder10/sendcode',
            data:{iv_oid:oid}
        }).then(function successCallback(response) {
            console.log(response)
        }, function errorCallback(response) {
            console.log(response)
             // alertService.alert(message,"@_@没发出去")
        })
    };
    HistoryService.verify_sms  = function(oid,verify_code) {
        var deferred = $q.defer();
        $http({
            method: 'post',
            url: API_URL+'MobOrder10/verifysms',
            data:{iv_oid:oid,iv_code:verify_code}
        }).then(function successCallback(response) {
            var data = response.data;
            if(data.ev_result == 0){
                deferred.resolve('done');
                alertService.alert("验证成功")
            }else{
                deferred.reject('error');
                alertService.alert("@_@验证码不对","出错啦")
            }

        }, function errorCallback(response) {
             deferred.reject('error');
             alertService.alert("@_@没发出去","出错啦")
        })
        return deferred.promise;
    }

    function change_status ($scope) {
        $scope.$evalAsync(function() {
           if ($scope.current != null) {
                $scope.updated = Date.now();
                switch($scope.current.status) {
                    case '0':
                        $scope.status.button='stable';
                        $scope.status.text='等待商家确认';
                        $scope.current.img = "./img/normal.png"
                        break;
                    case '10':
                        $scope.status.button='balanced';
                        $scope.status.text='商家已确认, 准备中';
                        $scope.current.img = "./img/happy.png"
                        break;
                    case '20':
                        $scope.status.button='royal';
                        $scope.status.text='商家已确认, 准备中';
                        $scope.current.img = "./img/happy.png"
                        break;
                    case '30':
                        $scope.status.button='cmconfirm';
                        $scope.status.text='送餐员已开始送餐';
                        $scope.current.img = "./img/happy.png"
                        break;
                    case '40':
                        $scope.status.button='calm';
                        $scope.status.text='已送到，满意吗？';
                        $scope.current.img = "./img/happy.png"
                        break;
                    case '55':
                        $scope.status.button='royal';
                        $scope.status.text='新用户订单确认中';
                        $scope.current.img = "./img/normal.png"
                        break;
                    case '60':
                        $scope.status.button='royal';
                        $scope.status.text='客服稍后联系您改运费 >_<';
                        $scope.current.img = "./img/normal.png"
                        break;
                    case '5':
                        $scope.status.button='assertive';
                        $scope.status.text='糟糕，有的菜没了 #_#';
                        $scope.current.img = "./img/unhappy.png"
                        break;
                }
           }
        });
    };

    return HistoryService
  })
