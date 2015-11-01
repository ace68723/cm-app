'use strict';

/**
 * @ngdoc service
 * @name helloIonicApp.addrService
 * @description
 * # addrService
 * Factory in the helloIonicApp.
 */
angular.module('chanmao')
  .service('RRService', function( $state, $rootScope, $q,$injector,$timeout,$ionicScrollDelegate,loadingService,alertService,API_URL) {
	var RRService = {};
	RRService.gotoRR  = function(rid) {
		var old_rid = window.localStorage.getItem("sv_rid");
		if (rid != old_rid){
			window.localStorage.setItem("sv_rid", rid);
			window.localStorage.removeItem('sa_dishes');
		}
	  
		// $state.go('tab.ordermenu');
	};
	  
	RRService.rrlist  = function($scope) {
		var $http =  $injector.get('$http')
		$http.get(API_URL+'MobOrder/Rrlist')
			.success(function(data, status, headers, config) {
				if (data.result== 1){

					// data.folder = "http://cmtest.littlesailing.com/" + data.folder;
					data.folder = "http://cmtest.littlesailing.com/img/oldapp/";
					  // $scope.types = [{ 'type':1, 'open': 1,'desc': '营业中','rrs': data.open,'img_url':data.folder }; { 'type':0, 'open': 0,'desc': '尚未营业', 'rrs': data.close,'img_url':data.folder }]
					  $scope.restaurant_open  =   { 'type':1, 'open': 1,'desc': '营业中','rrs': data.open,'img_url':data.folder };
					  $scope.restaurant_close =   { 'type':0, 'open': 0,'desc': '尚未营业', 'rrs': data.close,'img_url':data.folder };



					// TweenMax.fromTo('#restaurant', 1, {
					//   "margin-top": "100%", 
					// },
					// {
					//    "margin-top": "0", 
					// });
				}
				   
			}).error(function(data, status) { 
				alertService.alert('没有网络连接了,下拉刷新一下吧~','阿西吧 #_#!')
				loadingService.hideLoading()
			}).then(function(){
				setTimeout(function() {
					loadingService.hideLoading()
					$scope.$broadcast('scroll.refreshComplete');
				}, 1000);
			}); 
	  };

	RRService.rrmenu = function($scope) {
		var $http =  $injector.get('$http')
		var order_dishes = window.localStorage.getItem("sa_dishes");
		if (order_dishes != null){
		  order_dishes = JSON.parse(order_dishes);
		  $scope.totaldish = order_dishes.length;
		} else {
		  $scope.totaldish = 0;
		}

		var rid = window.localStorage.getItem("sv_rid");    
		var eo_data = {};
		eo_data.rid = rid;
		$http.post(API_URL + 'MobOrder/Rrmenu',eo_data)
			.success(function(data, status, headers, config) {

				if(data.result == 1){
					// $scope.menu =  data.menu;
					// $scope.name =  data.name;
					// $scope.open =  data.open;
					$scope.show_menu = true;
					// TweenMax.fromTo('#menu', 1, {
					//   "margin-top": "140%", 
					// },
					// {
					//    "margin-top": "0", 
					// });
					TweenMax.fromTo('#menu_nav', 1, {
					  "left": "140%", 
					},
					{
					   "left": "0", 
					});
					var sorting_menu = RRService.sorting_menu(data.menu)
					$scope.menu = sorting_menu.la_menu;
					$scope.cate = sorting_menu.la_cate;
					$scope.name = data.name;
					$scope.open = data.open
					
					if(order_dishes){
						$scope.total = RRService.reorder($scope,order_dishes,$scope.menu)
					}
					// console.log(data)
					
					// console.log($scope.cate)
					$timeout(function() {
					   _.forEach($scope.cate,function(cate,key) {
						   // console.log(cate,key)
						   cate.menu_position = getOffset( document.getElementById(cate.anchor)).top-43; 
						   // console.log( cate.menu_position)
					   })
					   var nav_width       = document.getElementById('anchor_nav0').offsetWidth 
					   	setTimeout(function() {
					   	 	TweenMax.staggerTo(".nav_btn", 0.5, {width:nav_width + 3+'px'}, 0.1);
					   	}, 500);
					   $scope.cate[0].current = true;
					   $scope.divice_width = $ionicScrollDelegate.$getByHandle('Nav').getScrollView().__clientWidth;
					   console.log($scope.divice_width)
					},500)
					
				}else{
				
				}
				

			}).error(function(data, status, headers, config) {
				alertService.alert('没有网络连接了','阿西吧 #_#!')
				loadingService.hideLoading()
			}).then(function(){
			 	setTimeout(function() {
 					loadingService.hideLoading()
 				}, 1000);
			   
		   }); 
	};

	function getOffset( el ) {
		var _x = 0;
		var _y = 0;
		while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
			_x += el.offsetLeft - el.scrollLeft;
			_y += el.offsetTop - el.scrollTop;
			el = el.offsetParent;
		}
		return { top: _y, left: _x };
	}

	RRService.sorting_menu = function(ia_menu) {
		// console.log(ia_menu)
		var id_k = 0; 
		var la_menu = [];
		var la_cate = [];
		_.forEach(ia_menu,function(cate,key) {
			var item = {}
			item.cate_name = cate.name;
			item.has_cate_name = true;
			item.ds_name=""
			// item.height = 34;
			item.anchor = 'anchor' +key
			item.anchor_nav = 'anchor_nav' +key
			la_menu.push(item);
			la_cate.push(item);
			_.forEach(cate.dishes,function(dish) {
				var item = {};
				item.id = 'a'+id_k
				id_k += 1;
				item.has_cate_name = false;
				item.ds_name  = dish.ds_name;
				item.dish_price = dish.price;
				item.dish_id    = dish.ds_id
				item.status     = dish.status
				item.int_no     = dish.int_no
				// item.height = 100;
				item.amount = 0;
				la_menu.push(item);
			})
		   
		})
		// console.log(la_menu)
		var eo_data = {}
		eo_data.la_menu = la_menu;
		eo_data.la_cate = la_cate;
		return eo_data;
	};
	RRService.reorder = function($scope,re_dishes,ia_menu) {
		// console.log('order_dishes',re_dishes)
		var total = 0;
		_.forEach(re_dishes,function(re_dish,key) {
			// console.log(re_dish.ds_id)
			var re_index =_.findIndex(ia_menu, { 'dish_id': re_dish.ds_id })
			ia_menu[re_index].amount = re_dish.amount
			total += Number(ia_menu[re_index].amount) * Number(ia_menu[re_index].dish_price)
			console.log(ia_menu[re_index])
 			ia_menu[re_index].amount = Number(ia_menu[re_index].amount)-1
			$scope.add_dish(ia_menu[re_index]) 
		})
		 
		return total
	};
	// RRService.dishadd = function($scope, ds_id, amount, int_no, ds_name, price) {
	// 	// window.localStorage.clear();
	// 	order_dishes = window.localStorage.getItem("sa_dishes");
	
	// 	var dish = { 'ds_id':  ds_id, 'amount': amount, 'int_no': int_no , 'ds_name': ds_name, 'price':price  };
	// 	if (order_dishes == null){
	// 	  order_dishes = new Array();
	// 	} else {
	// 	  order_dishes = JSON.parse(order_dishes);
	// 	};
		
	// 	for (var i = 0, len = order_dishes.length, flag = 0; i < len; i++) {
	// 	  if (order_dishes[i].ds_id == dish.ds_id) {
	// 		  order_dishes[i].amount = order_dishes[i].amount+dish.amount;
	// 		  flag = 1;
	// 	  }
	//   } 
	// 	  if (flag == 0) order_dishes.push(dish);
	// 	window.localStorage.setItem("sa_dishes", JSON.stringify(order_dishes));
	// 	  // window.localStorage.setItem("sv_pretax", $scope.totalpre);
	// 	$scope.totaldish = order_dishes.length;
	// 	$scope.closeModal();

	//   };
	  
	//   // RRService.// tomodify = function($scope) {
	// 	 // $state.go('tab.ordermodify');
   
	  // }; 
	return RRService
  })