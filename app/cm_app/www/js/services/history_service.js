'use strict';

/**
 * @ngdoc service
 * @name helloIonicApp.loadingService
 * @description
 * # loadingService
 * Factory in the helloIonicApp.
 */
angular.module('chanmao')
  .factory('HistoryService', function($http, $state,$location,$window,$rootScope,$ionicScrollDelegate,auth,scrollService,loadingService,alertService,API_URL) {
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
     
      $http.post(API_URL+'MobOrder/historylist', eo_data)
      .success(function(data, status, headers, config) {
            la_available = data.available
            if(data.current){
                lv_oid       = data.current.oid;
            }
           
            $scope.$evalAsync(function() {
                if(data.current){
                    $scope.current          = data.current;
                    $scope.available        = data.available; 
                    $scope.rid              = data.current.rid;  
                    var rrname              = data.current.rrname.split('(')[0]
                    var rrarea              = data.current.rrname.split('(')[1].split(')')[0]
                    $scope.current.rrname   = rrname
                    $scope.current.rrarea   = rrarea
                    $scope.current.uaddr    = data.current.uaddr.split(',')[0]  
                    
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
                          find_unavailable($scope)
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
       // $state.go('tab.order');   
       $location.path('/tab/order/menu/' + $scope.rid)
    };

    function change_status ($scope) {
        $scope.$evalAsync(function() {
           if ($scope.current != null) {
                $scope.updated = Date.now();
                switch($scope.current.status) {
                    case '0':
                        $scope.status.button='stable';
                        $scope.status.text='等待商家确认';
                        break;
                    case '10':
                        $scope.status.button='balanced';
                        $scope.status.text='商家已确认, 准备中';
                        break;
                    case '20':
                        $scope.status.button='royal';
                        $scope.status.text='商家已确认, 准备中';
                        break;
                    case '30':
                        $scope.status.button='cmconfirm';
                        $scope.status.text='送餐员已开始送餐';
                        break;    
                    case '40':
                        $scope.status.button='calm';
                        $scope.status.text='已送到，满意吗？';
                        break;
                    case '55':
                        $scope.status.button='royal';
                        $scope.status.text='新用户订单确认中';
                        break;    
                    case '60':
                        $scope.status.button='royal';
                        $scope.status.text='客服稍后联系您改运费 >_<';
                        break;    
                    case '5':
                        $scope.status.button='assertive';
                        $scope.status.text='糟糕，有的菜没了 #_#';
                        break;
                }
           }
        });
    };

    function find_unavailable($scope) {
        var userOrder = $window.localStorage.getItem('userOrder');
        userOrder = JSON.parse(userOrder);
        var unavailable_dish = [];
        var message = "";
        var count = 0;
        _.forEach(userOrder.dishes, function(dish) {

            var found = _.findIndex(la_available, function(ava_dish) {
              return ava_dish.ds_id == dish.dish_id;
            });

            if(found == "-1"){
                count += 1;
                unavailable_dish.push(dish)
                message += count + ". " + dish.ds_name + ';';
            }
        })
        $location.path('/tab/history')
        $scope.unavailable_dish = unavailable_dish;
        alertService.alert(message,"@_@没菜了")

    };

    return HistoryService
  })
