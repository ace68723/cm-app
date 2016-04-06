'use strict';

/**
 * @ngdoc service
 * @name helloIonicApp.addrService
 * @description
 * # addrService
 * Factory in the helloIonicApp.
 */
angular.module('chanmao')
  .factory('OrderService', function($http, $q,$location, $window,$rootScope,$ionicHistory,loadingService, alertService, auth,scrollService, API_URL,version) {
	var OrderService = {}
	var storage = $window.localStorage;
	var cached_order;
	var order_dishes;
	  OrderService.readyList =function($scope) {
		order_dishes = window.localStorage.getItem("sa_dishes");
		order_dishes = JSON.parse(order_dishes);
		totalpre = 0.00;
		for (var i = 0; i < order_dishes.length; i++){
		  totalpre = totalpre + order_dishes[i].price * order_dishes[i].amount;
		};
		$scope.dishes = order_dishes;
		$scope.totaldish = order_dishes.length;
		$scope.totalpre = totalpre;
	  }

	  OrderService.dishDelete =function($scope, ds_id) {
  		pre_dishes = window.localStorage.getItem("sa_dishes");
  		pre_dishes = JSON.parse(pre_dishes);
  		totalpre = 0.00;
  		order_dishes = new Array();
  		for (var i = 0; i < pre_dishes.length; i++){
  		  if (pre_dishes[i].ds_id != ds_id){
  			order_dishes.push(pre_dishes[i]);
  			totalpre = totalpre + pre_dishes[i].price * pre_dishes[i].amount;
  		  }
  		};
  		$scope.dishes = order_dishes;
  		$scope.totaldish = order_dishes.length;
  		$scope.totalpre = totalpre;
  		window.localStorage.setItem("sa_dishes", JSON.stringify(order_dishes));
  		// window.localStorage.setItem("sv_pretax", $scope.totalpre);
  		$scope.closeModal();
	  }

	  OrderService.dishChange =function($scope, ds_id, amount) {
		    pre_dishes = window.localStorage.getItem("sa_dishes");
  		pre_dishes = JSON.parse(pre_dishes);
  		order_dishes = new Array();
  		totalpre = 0.00;
  		for (var i = 0; i < pre_dishes.length; i++){
  		  if (pre_dishes[i].ds_id == ds_id){
  			pre_dishes[i].amount = amount;
  		  };
  		  order_dishes.push(pre_dishes[i]);
  		  totalpre = totalpre + pre_dishes[i].price * pre_dishes[i].amount;
  		};
  		$scope.dishes = order_dishes;
  		$scope.totaldish = order_dishes.length;
  		$scope.totalpre = totalpre;
  		window.localStorage.setItem("sa_dishes", JSON.stringify(order_dishes));
  		// window.localStorage.setItem("sv_pretax", $scope.totalpre);
  		$scope.closeModal();
	  }

	  OrderService.delifee =function(uaid,pretax,dltype,coupon) {
        var deferred = $q.defer();

    		  var rid = storage.getItem("sv_rid");

          var CalcFeeData     = {}

          CalcFeeData.rid     = rid;
          CalcFeeData.uaid    = uaid;
          CalcFeeData.pretax  = pretax;
          CalcFeeData.dltype  = dltype;
          CalcFeeData.code    = coupon;

          console.log('CalcFeeData: ', CalcFeeData)

    		  $http.post(API_URL+'MobOrder10/CalcFee', CalcFeeData)
    			.success(function(data, status, headers, config) {
        				console.log('delifee',data)
                if(data.result == 0){// result 0 执行成果，1 执行失败
                    if ( data.dltype == 2) {
                      alertService.alert('您的地址已超出普通送餐范围，只能选择订制运费');
                    }
                    deferred.resolve(data);

                }else{
                  $rootScope.noNetwork();
                  deferred.reject()
                }

  			   }).error(function(data, status) {
  					  $rootScope.noNetwork();
              deferred.reject()
  			   });
  		  return deferred.promise;

	  }

    OrderService.beforeCheckout = function (totalpre) {
      var deferred = $q.defer();
          var rid = storage.getItem("sv_rid");
          var beforecoData = {
            pretax: Number(totalpre),
            rid: parseInt(rid),
          }
          var eo_data = {};
          $http.post(API_URL+'MobOrder10/BeforeCO', beforecoData)
          .success(function(data, status, headers, config) {
                // result 0 执行成果，1 执行失败
                if(data.result == 0){
                    deferred.resolve(data);
                }else{
                   deferred.reject('network error');
                  $rootScope.noNetwork();
                }
             }).error(function(data, status) {
                deferred.reject('network error');
                $rootScope.noNetwork();
             });
      return deferred.promise;
    }
	  OrderService.checkout =function($scope) {

		order_dishes = window.localStorage.getItem("userOrder");
		order_dishes = JSON.parse(order_dishes).dishes;
		$scope.dltype =  $scope.select.selected_dltype;
		console.log('comment',$scope.comment)
		// // if ($scope.dltype == 1) {
			console.log('order_dishes',order_dishes)
			var rid = window.localStorage.getItem("sv_rid");
			var ea_dishes = []
			_.forEach(order_dishes,function(dish,key) {
				if(dish.amount>0){
					var lo_dish     = {};
					lo_dish.ds_id   = dish.dish_id
					lo_dish.amount  = dish.amount
					lo_dish.int_no  = dish.int_no
					lo_dish.ds_name = dish.ds_name
					lo_dish.price   = dish.dish_price
					ea_dishes.push(lo_dish)
				}
			})
			var channel = auth.getChannel();
			var eo_data = {
				rid: parseInt(rid),
				uaid: parseInt($scope.uaid),
				// uid : parseInt(uid),
				channel 	: channel, // 0. Web 1. iOS 2.  Android
				dltype 		: $scope.dltype,
				dlexp 		: $scope.dlexp,
				pretax 		: $scope.pretax_ori,
				comment 	: $scope.comment,
				items 		: ea_dishes,
				version		:  version
			}
				console.log(eo_data)

		   $http.post(API_URL+'MobOrder10/checkout',eo_data )
			.success(function(data, status, headers, config) {
					$scope.result = data.result;
					$scope.content = data.errorcontent;
			   }).error(function(data, status) {
				  if ((status === null) || (status === undefined)){

				  } else {
					  $rootScope.noNetwork();
				  }
			   }).then(function(){
				loadingService.hideLoading()
				if ($scope.result == 0) {
					alertService.alert('请不要关闭App,直至商家确认，谢谢');
					window.localStorage.removeItem('sv_rid');
					window.localStorage.removeItem('sa_dishes');
				} else {
					alertService.alert('下单失败，请联系客服: 647-515-6699');
				}
				$scope.confirm_dish = []
				$location.path('/tab/history')
				setTimeout(function() {
					// scrollService.scroll_refresh()
					scrollService.scroll_refresh("history_scroll")
				}, 200);


				// var tabs = document.querySelectorAll('div.tabs')[0];
				// tabs = angular.element(tabs);
				// tabs.css('display', '');

				$ionicHistory.clearCache();
				$ionicHistory.clearHistory()


			});
		// };
	  }
	  OrderService.save_order = function(ia_corder) {
		cached_order = ia_corder;
		storage.setItem('userOrder', JSON.stringify(ia_corder));
	  };
	  OrderService.get_order = function() {
			 if(!cached_order){
				 cached_order = storage.getItem('userOrder');
				 cached_order = JSON.parse(cached_order)
			 }
			 return cached_order;
		 };
	return  OrderService
  })
