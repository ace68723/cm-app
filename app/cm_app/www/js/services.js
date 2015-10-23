angular.module('chanmao.services', [])

.factory('SystemService', function($http, $state,auth) {
  return {
  	logout: function() {
  		window.localStorage.removeItem('sv_uid');
  		window.localStorage.removeItem('sv_rid');
  		window.localStorage.removeItem('sa_dishes');
  		auth.removeToken(); 
  		$state.go('login');
  	},
  	
  	navigate: function(view) {
  		$state.go(view);
  	},  	
    // check: function($scope) {
      // $http.post(API_URL+'MobOrder/historylist', { uid: 15 })
      // .success(function(data, status, headers, config) {
            // if (data.result == 1)
           	 // $scope.orders = data.historylist; 
           	 // $scope.loadingIndicator.hide();
           // }).error(function(data, status) { 
                // console.log('error');
           // }).then(); 
    // },

  };
})

.factory('LoginService', function($http, $state, $rootScope,API_URL,auth) {
 return {
    login: function($scope, $ionicPopup) {	
      errortext = '';	
	  if (($scope.login.username == null) ||
		  ($scope.login.password == null))  
	  	errortext = '* 请按正确格式填写所有字段<br>';
	  if (errortext != ''){	  		  
		  $scope.showValidation(errortext); 
	  } else {	
      	$http.post(API_URL+'MobLogin/login', { username: $scope.login.username, password: $scope.login.password })
      	.success(function(data, status, headers, config) {
            $scope.result = data.result ;
            if (data.result == 1) 
                auth.setToken(data.token)
           	   window.localStorage.setItem("sv_uid", data.uid);
           	   window.localStorage.removeItem('sv_last');
           	   window.localStorage.removeItem('sv_rid');
           	   window.localStorage.removeItem('sa_dishes');
           	   
           }).error(function(data, status) { 
                $rootScope.noNetwork(); 
           }).then(function(){
           	 if ($scope.result != 1){      	 
           	 	errortext = '* 用户名和密码不匹配<br>';	
           	 	$scope.showValidation(errortext); 
			 } else {
			 	$scope.showSuccess();
			 } 	 	 
         });
      }     
    },

	register: function($scope, $ionicPopup) {
	  errortext = '';	
	  if (($scope.register.username == null) ||
		  ($scope.register.password == null) ||
		  ($scope.register.password2 == null) ||
		  ($scope.register.email == null) ||
		  ($scope.register.email2 == null) )
		  errortext = '* 请按正确格式填写所有字段<br>';
	  if ($scope.register.password != $scope.register.password2)
		  errortext = errortext + '* 两次输入的密码不一致<br>';
	  if ($scope.register.email != $scope.register.email2)
		  errortext = errortext + '* 两次输入的Email不一致<br>';
	  if (errortext != ''){	  		  
		  $scope.showValidation(errortext); 
	  } else {	  	
	      $http.post(API_URL+'MobLogin/register', { username: $scope.register.username, password: $scope.register.password, email: $scope.register.email })
	      .success(function(data, status, headers, config) {
	            $scope.result = data.result;  
	            if (data.result == 2)
	           	   errortext = data.errorcontent; 
	           }).error(function(data, status) { 
	                $rootScope.noNetwork(); 
	           }).then(function(){
	           	 if ($scope.result == 1){      	 	
	           	 	$scope.showSuccess(); 
				 } else if ($scope.result == 2){  
				 	$scope.showValidation(errortext); 
				 }    	 
	           }); 
      }
    },    
 
    forget: function($scope, $ionicPopup, mode) {	
      errortext = "";	
	  if ($scope.forget.email == null )
		  errortext = '* 请按正确格式填写所有字段<br>';
	  if (errortext != ''){	  		  
		  $scope.showValidation(errortext); 
	  } else {		  
	      $http.post(API_URL+'MobLogin/forget', { email: $scope.forget.email, mode: mode })
	      .success(function(data, status, headers, config) {
	           	 $scope.result = data.result ; 
	           	 errortext = data.errorcontent;
	           }).error(function(data, status) { 
	                $rootScope.noNetwork(); 
	           }).then(function(){
	           	 if ($scope.result == 1){      	 	
	           	 	$scope.showAlert(); 
				 } else if ($scope.result == 2){  
					 	$scope.showValidation(errortext); 
				 }    	
	           }); 
	   }
    },
  };
})

// .factory('RRService', function($http, $state, $rootScope,API_URL) {
//  return {
//  	gotoRR	: function(rid) {
//  	  old_rid = window.localStorage.getItem("sv_rid");
//  	  if (rid != old_rid){
//  	  	window.localStorage.setItem("sv_rid", rid);
//  	  	window.localStorage.removeItem('sa_dishes');
//  	  }
 	  
//       // $state.go('tab.ordermenu');
//     },
    
//     rrlist	: function($scope) {
   
//       $http.get(API_URL+'MobOrder/Rrlist')
//       .success(function(data, status, headers, config) {
//             if (data.result== 1)
//                 console.log(data)
//                 // console.log( data.folder) 
//                 // data.folder = "http://cmtest.littlesailing.com/" + data.folder;
//                 data.folder = "http://cmtest.littlesailing.com/img/oldapp/";
//                 console.log(data)
//            	    $scope.types = [{ 'type':1, 'open': 1,'desc': '营业中','rrs': data.open,'img_url':data.folder }, { 'type':0, 'open': 0,'desc': '尚未营业', 'rrs': data.close,'img_url':data.folder }];
//            	    $scope.restaurant_open  =   { 'type':1, 'open': 1,'desc': '营业中','rrs': data.open,'img_url':data.folder };
//                 $scope.restaurant_close =   { 'type':0, 'open': 0,'desc': '尚未营业', 'rrs': data.close,'img_url':data.folder };

//                 setTimeout(function() {
//                     $scope.$broadcast('scroll.refreshComplete');
//                 }, 1000);
//            }).error(function(data, status) { 
//                 $rootScope.noNetwork(); 
//            }).then(function(){
           	  
//            }); 
//     },

//     rrmenu: function($scope) {
//       order_dishes = window.localStorage.getItem("sa_dishes");
//       if (order_dishes != null){
//       	order_dishes = JSON.parse(order_dishes);
//       	$scope.totaldish = order_dishes.length;
//       } else {
//       	$scope.totaldish = 0;
//       }
//       rid = window.localStorage.getItem("sv_rid");   
//       // $http.post(API_URL+'MobOrder/Rrmenu', { rid: rid })
//       // .success(function(data, status, headers, config) {
//       //       if (data.result== 1)
//       //      	   $scope.menu =  data.menu;
//       //      	   $scope.name =  data.name;
//       //      	   $scope.open =  data.open; 
//       //      }).error(function(data, status) { 
//       //          $rootScope.noNetwork(); 
//       //      }).then(function(){
           	  
//       //      });  
//         $http({
//           method: 'POST',
//           url: API_URL+'MobOrder/Rrmenu',
//           data:{ rid: rid }
//         }).then(function successCallback(response) {
//             var data = response.data;
//             console.log(response)
//             if (data.result== 1)
//                 $scope.menu =  data.menu;
//                 $scope.name =  data.name;
//                 $scope.open =  data.open;
//                 console.log($scope.menu) 
//           }, function errorCallback(response) {
//              $rootScope.noNetwork(); 
//           });
//     },

//     dishadd	: function($scope,  ds_id, amount, int_no, ds_name, price) {
//     	// window.localStorage.clear();
//     	order_dishes = window.localStorage.getItem("sa_dishes");
  
//     	var dish = { 'ds_id':  ds_id, 'amount': amount, 'int_no': int_no , 'ds_name': ds_name, 'price':price  };
//     	if (order_dishes == null){
//     		order_dishes = new Array();
//     	} else {
//     		order_dishes = JSON.parse(order_dishes);
//     	};
    	
//     	for (var i = 0, len = order_dishes.length, flag = 0; i < len; i++) {
//     		if (order_dishes[i].ds_id == dish.ds_id) {
//     				order_dishes[i].amount = order_dishes[i].amount+dish.amount;
//     				flag = 1;
//     		}
// 		}	
//         if (flag == 0) order_dishes.push(dish);
//     	window.localStorage.setItem("sa_dishes", JSON.stringify(order_dishes));
//         // window.localStorage.setItem("sv_pretax", $scope.totalpre);
//     	$scope.totaldish = order_dishes.length;
//     	$scope.closeModal();

//     },
    
//     // tomodify : function($scope) {
//  	     // $state.go('tab.ordermodify');
// // 
//     // },	
//   };
// })

.factory('OrderService', function($http, $location, $state,constant,$rootScope,API_URL) {
 return {
    readyList : function($scope) {
      order_dishes = window.localStorage.getItem("sa_dishes");
      order_dishes = JSON.parse(order_dishes);  
      totalpre = 0.00;
      for (var i = 0; i < order_dishes.length; i++){
      	totalpre = totalpre + order_dishes[i].price * order_dishes[i].amount;
      };
      $scope.dishes = order_dishes;
      $scope.totaldish = order_dishes.length;
      $scope.totalpre = totalpre;
    },
    
    dishDelete : function($scope, ds_id) {
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
    },

    dishChange : function($scope, ds_id, amount) {
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
    },

    delifee : function($scope) {
      dlexp = 0.00;
      $scope.dlexp = dlexp ;
      if ($scope.dltype == 1) {
      	 rid = window.localStorage.getItem("sv_rid");
      	 $http.post(API_URL+'MobOrder/calcdeli', { rid: parseInt(rid), uaid: parseInt($scope.uaid) })
      		.success(function(data, status, headers, config) {
            	$scope.result = data.result; 
            	$scope.dlexp = data.dlexp;
	           }).error(function(data, status) { 
	                $rootScope.noNetwork(); 
	           }).then(function(){
	           		if ( $scope.result == 0) {
	           			$scope.showExceed(); 	           			
	           		}
	           }); 
      };
      
    },
    
    checkout : function($scope) {
      order_dishes = window.localStorage.getItem("sa_dishes");
      order_dishes = JSON.parse(order_dishes);
      // // if ($scope.dltype == 1) {
      	 rid = window.localStorage.getItem("sv_rid");
      	 uid = window.localStorage.getItem("sv_uid");
      	 $http.post(API_URL+'MobOrder/checkout', { 
      	 						rid: parseInt(rid), 
      	 						uaid: parseInt($scope.uaid),
								uid : parseInt(uid),
								channel : constant.channel, // 0. Web 1. Android 2. iOS 
								dltype : $scope.dltype,
								dlexp : $scope.dlexp,
								pretax : $scope.totalpre,
								comment : $scope.comment,
								items : order_dishes,
      	 						 })
      		.success(function(data, status, headers, config) {
                $scope.result = data.result;
            	$scope.content = data.errorcontent; 
	           }).error(function(data, status) { 
	           		if ((status === null) || (status === undefined)){
	           			
	           		} else {
	                	$rootScope.noNetwork(); 
	           		}
	           }).then(function(){
	           	if ($scope.result == 1) {
	           		$scope.showSuccess('请不要关闭App,直至商家确认，谢谢');
	           		window.localStorage.removeItem('sv_rid');
  					window.localStorage.removeItem('sa_dishes');
	           	 } else $scope.showError('下单失败，请联系客服: 647-515-6699'); //$scope.content
	           }); 
      // };
    },  
  };
})

.factory('HistoryService', function($http, $state,$rootScope,loadingService,API_URL) {
 return {
    load: function($scope, mode) {  	
      uid = window.localStorage.getItem("sv_uid");  
      $http.post(API_URL+'MobOrder/historylist', { uid: uid })
      .success(function(data, status, headers, config) {
             $scope.current = data.current;
           	 $scope.orders = data.historylist; 
           	 $scope.available = data.available; 
           	 $scope.rid = data.rid; 
           	    if (mode == 1){
                    setTimeout(function() {
                        $scope.$broadcast('scroll.refreshComplete');
                    }, 1000);
                };
           }).error(function(data, status) { 
              $rootScope.noNetwork(); 
           }).then(function(){
              setTimeout(function() {
                     loadingService.hideLoading()
              }, 1500);

           	   if ($scope.current != null) {
           	   		$scope.updated = Date.now();
           	   		switch($scope.current.status) {
						case '0':
						    $scope.status.badge='stable';
						    $scope.status.text='等待商家确认';
						    break;
						case '10':
						    $scope.status.badge='balanced';
						    $scope.status.text='商家已确认, 准备中';
						    break;
						// case 20:
						    // ode block
						    // break;
						case '30':
						    $scope.status.badge='cmconfirm';
						    $scope.status.text='送餐员已开始送餐';
						    break;    
						case '40':
						    $scope.status.badge='positive';
						    $scope.status.text='已送到，满意吗？';
						    break;
						case '55':
						    $scope.status.badge='royal';
						    $scope.status.text='新用户订单确认中';
						    break;    
						case '60':
						    $scope.status.badge='royal';
						    $scope.status.text='客服稍后联系您改运费';
						    break;    
						case '5':
						    $scope.status.badge='dark';
						    $scope.status.text='糟糕，有的菜没了';
						    break;
					}
           	   }
	           
           }); 
           
    },
    
    recover: function($scope) {  	
       window.localStorage.setItem("sv_rid", $scope.rid);
	   window.localStorage.setItem("sa_dishes", JSON.stringify($scope.available)); 
	   $state.go('tab.order');
    },
    
  };
})

.factory('AddressService', function($http, $state,$rootScope,API_URL) {
    var editing_addr;
 return {
    all: function($scope) {
    	uid = window.localStorage.getItem("sv_uid");  
      $http.post(API_URL+'MobAddress/addresslist', { uid: uid  })
      .success(function(data, status, headers, config) {
            if (data.result == 1)
           	 $scope.address = data.address; 
           	 // $scope.loadingIndicator.hide();
           }).error(function(data, status) { 
               $rootScope.noNetwork(); 
           }).then(); 
    },
    exist: function($scope) {
    	uid = window.localStorage.getItem("sv_uid"); 
    	exist = 0; 
      $http.post(API_URL+'MobAddress/addressexist', { uid: uid  })
      .success(function(data, status, headers, config) {
            if (data.result == 1)
           	exist = data.exist; 
           }).error(function(data, status) { 
                 $rootScope.noNetwork(); 
           }).then(function(){
           		$scope.exist = exist;
           }); 
    },
	validate: function($scope) {
		errortext = '';	
		if (($scope.addr.name == null) ||
			  ($scope.addr.tel == null) ||
			  ($scope.addr.city == null) ||
			  ($scope.addr.postal == null) ||
			  ($scope.addr.addr == null) )
			  errortext = '* 请按正确格式填写所有字段<br>';
	    if (errortext != ''){	  		  
			  $scope.showValidation(errortext); 
		} else	{  
	   		var address_str = $scope.addr.addr+'+'+$scope.addr.city+'+ON';
	   		address_str = address_str.replace(/\s/g,"+");
	   		var geocoder = new google.maps.Geocoder();
			var geocoderRequest = { address: address_str };
			geocoder.geocode(geocoderRequest, function(results, status){
				if (status == 'OK'){
			  		$scope.addr.address = results[0]['formatted_address'];
					$scope.addr.lat = results[0].geometry.location.lat();
					$scope.addr.lng = results[0].geometry.location.lng();
			  	} else {
			  		$scope.addr.address = "系统无法检测到您的地址，请返回重新检查地址格式";			
			  	}		
			  	console.log("service_inner"+$scope.addr.address+"service_inner"+$scope.addr.lat+$scope.addr.lng);
			  	$scope.openModal();
			//do your result related activities here, maybe push the coordinates to the backend for later use, etc.
			});
		}
	},
	create: function($scope) {
	  $scope.addr.uid = window.localStorage.getItem("sv_uid");
      $http.post(API_URL+'MobAddress/Addresscreate',  $scope.addr )
      .success(function(data, status, headers, config) {
            if (data.result == 1)
           	 $scope.result = data.result;          	 
           }).error(function(data, status) { 
                 $rootScope.noNetwork(); 
           }).then(function(){
           	 if ($scope.result == 1){
           	 	$scope.closeModal();
			 	$state.go('tab.address');
			 }
           }); 
    },
    save_addr:function(addr) {
        editing_addr = addr;
    },
    get_addr:function() {
        return editing_addr;
    },
    addr_delete:function(addr) {
        console.log(addr)
        var uaid = addr.uaid
        var data = {};
        data.uaid = uaid;
        data.del = "1";
        $http.post(API_URL+'MobAddress/Addressupdate', data)
        .success(function(data, status, headers, config) {
              if (data.result == 1){

              }
             }).error(function(data, status) { 
                 $rootScope.noNetwork(); 
             }).then(); 
    }

	
  };
  
})



;