angular.module('chanmao.controllers', [])
.run(function($rootScope, $ionicPopup, SystemService) {

  $rootScope.noNetwork = function() {
		$ionicPopup.alert({
			          title: '发生错误',
		              content: '网络故障，请检查网络是否连接正常',
		              okText: '了解'
		            }).then(function(res) {
		                 // SystemService.logout($scope);
		            });
		};
		
  $rootScope.message = function(title, content) {
		$ionicPopup.alert({
			          title: title,
		              content: content,
		              okText: '了解'
		            }).then(function(res) {
		                 // SystemService.logout($scope);
		            });
		};		
})
.filter('dateToISO', function() {
  return function(input) {
  	input = input.replace(/(.+) (.+)/, "$1T$2Z");
    // input = new Date(input).toISOString();
    return input;
  };
})


.controller('LoginCtrl', function($scope, $state) {
 	uid = window.localStorage.getItem("sv_uid");  
	if (uid != null){
		$state.go('tab.history');
	}
})

.controller('IntroCtrl', function( $scope) {
	
  $scope.startApp = function() {
    $state.go('tabs.history');
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };

})
.controller('LoginFormCtrl', function( $scope, $state, $ionicLoading, $ionicPopup, LoginService, $window) {
	$scope.showSuccess = function() {
		$ionicPopup.alert({
			          title: '登录验证',
		              content: '密码正确',
		              okText: '进入馋猫'
		            }).then(function(res) {
		                 $state.go('tab.history');
		            });
		};
		
	$scope.showValidation = function(content) {
		$ionicPopup.alert({
		              title: '请检查以下错误',
		              content: content,
		              okText: '返回修改'
		            }).then(function(res) {
		                 // $state.go('login');
		            });
		};	

	$scope.showLoading = function() {
  		$ionicLoading.show({
	        content: '登录验证中...',
	        animation: 'fade-in',
	        showBackdrop: true,
	        maxWidth: 200,
        // showDelay: 500
    	}); 
    };
    $scope.hideLoading = function(){
    	$ionicLoading.hide();
  	};
    
    $scope.login = function() {
		$scope.showLoading();
		LoginService.login($scope, $ionicPopup);
	};	

})

.controller('RegisterFormCtrl', function( $scope, $state, $ionicLoading, $ionicPopup, LoginService) {
	$scope.showSuccess = function() {
		$ionicPopup.alert({
		              title: '注册成功',
		              content: '请检查注册邮箱进行激活',
		              okText: '返回登录'
		            }).then(function(res) {
		                 $state.go('logindone');
		            });
		};
		
	$scope.showValidation = function(content) {
		$ionicPopup.alert({
		              title: '请检查以下错误',
		              content: content,
		              okText: '返回修改'
		            }).then(function(res) {
		                 // $state.go('login');
		            });
		};		
	$scope.showLoading = function() {
  		$ionicLoading.show({
	        content: '注册进行中...',
	        animation: 'fade-in',
	        showBackdrop: true,
	        maxWidth: 200,
        // showDelay: 500
    	}); 
    };
    $scope.hideLoading = function(){
    	$ionicLoading.hide();
  	};
	$scope.register = function() {
		$scope.showLoading();
	    LoginService.register($scope, $ionicPopup);
	};	
	$scope.backLogin = function() {
		$state.go('login');
	};	

})

.controller('ForgetFormCtrl', function( $scope, $state, $ionicLoading, $ionicPopup, LoginService) {
	$scope.showAlert = function() {
		$ionicPopup.alert({
		              title: '成功',
		              content: '请检查相关邮箱并进行处理',
		              okText: '了解'
		            }).then(function(res) {
		                 $state.go('login');
		            });
		};

	$scope.showValidation = function(content) {
		$ionicPopup.alert({
		              title: '请检查以下错误',
		              content: content,
		              okText: '返回修改'
		            }).then(function(res) {
		                 // $state.go('login');
		            });
		};		
	$scope.showLoading = function() {
  		$ionicLoading.show({
	        content: '处理进行中...',
	        animation: 'fade-in',
	        showBackdrop: true,
	        maxWidth: 200,
        // showDelay: 500
    	}); 
    };
    $scope.hideLoading = function(){
    	$ionicLoading.hide();
  	};	
  	    
	$scope.forget = function(mode) {
		$scope.showLoading();
		LoginService.forget($scope, $ionicPopup, mode);
	};	

	$scope.backLogin = function() {
		$state.go('login');
	};	
	
	$scope.forget.email = null;
})


.controller('OrderCtrl', function($scope, RRService) {
      RRService.rrlist($scope);
      $scope.gotoRR = function(rid) {	
      	RRService.gotoRR(rid);
  	  };	
})

.controller('OrderMenuCtrl', function($scope, $state, $stateParams, $ionicLoading, $ionicModal, RRService,$rootScope) {
// Hide the tab
    // var tabs = document.querySelectorAll('div.tabs')[0];
    // tabs = angular.element(tabs);
    // tabs.css('display', 'none');
 // Trigger the loading indicator
  	$scope.showLoading = function() {
  		$scope.loadingIndicator = $ionicLoading.show({
        content: '数据获取中...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        // showDelay: 500
    	}); 
    };  
    $scope.$on('$destroy', function() {
      // tabs.css('display', '');
      $scope.modal.remove();
      
    });
    
	$scope.gotoModify = function() {
		if ($scope.totaldish == 0) $rootScope.message('注意', '当前还没点任何菜品'); 
		 else $state.go('tab.ordermodify');
	};    
            
    $scope.amountAdd = function(){
    	if ($scope.amount < 10)
    	$scope.amount = $scope.amount + 1;
    };
    
    $scope.amountRemove = function(){
    	if ($scope.amount > 1)
    	$scope.amount = $scope.amount - 1;
    };
 	
 	$scope.order = function(ds_id, int_no, ds_name, price) {
 		$scope.amount = 1;
 		$scope.ds_id = ds_id;
 		$scope.int_no = int_no;
 		$scope.ds_name = ds_name;
 		$scope.price = price;
		$scope.openModal();
	};
	   
    $ionicModal.fromTemplateUrl('order-menu-modal.html', function(modal) {
	    $scope.modal = modal;
	  }, {
	    // Use our scope for the scope of the modal to keep it simple
	    scope: $scope,
	    // The animation we want to use for the modal entrance
	    animation: 'slide-in-up'
	  });

	$scope.openModal = function() {
	    $scope.modal.show();
	};
	$scope.closeModal = function() {
	    $scope.modal.hide();
	};    
    
 	$scope.dishAdd = function(ds_id,amount,int_no,ds_name,price) {
		RRService.dishadd($scope,ds_id,amount,int_no,ds_name,price);
	};    
	
	
    RRService.rrmenu($scope);
 	if ($scope.totaldish == null) $scope.totaldish = 0;
	// $scope.orderModify = function(){
		// RRService.tomodify();
	// };
})

.controller('OrderModifyCtrl', function($scope, $ionicModal, OrderService, AddressService) {
    $ionicModal.fromTemplateUrl('order-modify-modal.html', function(modal) {
	    $scope.modal = modal;
	  }, {
	    // Use our scope for the scope of the modal to keep it simple
	    scope: $scope,
	    // The animation we want to use for the modal entrance
	    animation: 'slide-in-up'
	  });

	$scope.openModal = function() {
	    $scope.modal.show();
	};
	
	$scope.closeModal = function() {
	    $scope.modal.hide();
	}; 
	
    $scope.amountAdd = function(){
    	if ($scope.amount < 10)
    	$scope.amount = $scope.amount + 1;
    };
    
    $scope.amountRemove = function(){
    	if ($scope.amount > 1)
    	$scope.amount = $scope.amount - 1;
    };
 		
 	$scope.dishDelete = function(ds_id) {
		OrderService.dishDelete($scope,ds_id);
		
	};

 	$scope.dishModify = function(ds_id, int_no, ds_name, amount) {
 		$scope.amount = amount;
 		$scope.ds_id = ds_id;
 		$scope.int_no = int_no;
 		$scope.ds_name = ds_name;
		$scope.openModal();
	};	
	
 	$scope.dishChange = function(ds_id, amount) {
		OrderService.dishChange($scope, ds_id, amount);
		
	};
	
	$scope.exist = null;
	AddressService.exist($scope);
    OrderService.readyList($scope);
	
      
})


.controller('OrderCheckoutCtrl', function($scope, $state, $location, $ionicPopup, $ionicLoading, OrderService, AddressService) {
    // $ionicModal.fromTemplateUrl('order-checkout-modal.html', function(modal) {
	    // $scope.modal = modal;
	  // }, {
	    // // Use our scope for the scope of the modal to keep it simple
	    // scope: $scope,
	    // // The animation we want to use for the modal entrance
	    // animation: 'slide-in-up'
	  // });
// 
	// $scope.openModal = function() {
	    // $scope.modal.show();
	// };
// 	
	// $scope.closeModal = function() {
	    // $scope.modal.hide();
	// }; 
// 	
 	// $scope.dishDelete = function(ds_id) {
		// OrderService.dishDelete($scope,ds_id);
// 		
	// };
// 
 	// $scope.dishModify = function(ds_id, int_no, ds_name, amount) {
 		// $scope.amount = amount;
 		// $scope.ds_id = ds_id;
 		// $scope.int_no = int_no;
 		// $scope.ds_name = ds_name;
		// $scope.openModal();
	// };	
	
	$scope.showLoading = function() {
    	$ionicLoading.show({
      		content: '数据提交中...',
      		animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
    	});
  	};
  	$scope.hideLoading = function(){
    	$ionicLoading.hide();
  	};
	
	$scope.showExceed = function() {
		$ionicPopup.alert({
		              title: '请注意',
		              content: '您的地址已超出普通送餐范围，只能选择订制运费',
		              okText: '好的，我了解'
		            }).then(function(res) {
		                 // $state.go('login');
		            });
		};		
	
	$scope.showSuccess = function(content) {
		$ionicPopup.alert({
		              title: '订单提交成功',
		              content: content,
		              okText: '好的'
		            }).then(function(res) {
		            	$state.go('tab.history', null, { reload: true });
		            });
		};
	$scope.showError = function(content) {
		$ionicPopup.alert({
		              title: '请注意',
		              content: content,
		              okText: '好的'
		            }).then(function(res) {
		                 // $state.go('tab.history');
		            });
		};			
  	$scope.dltypeChange = function(delitype){
  		$scope.dltype = delitype.value;
  		$scope.deliChange();//$scope.dltype, $scope.uaid); 
  	};	
  	$scope.uaidChange = function(addr){
  		$scope.uaid = addr.uaid;
  		$scope.deliChange();//$scope.dltype, $scope.uaid); $scope.dltype, $scope.uaid); 
  	};	
		
  	$scope.deliChange = function(){
  		// $scope.showLoading();
  		 // console.log($scope.dltype, $scope.uaid);
  		if ($scope.uaid != null) OrderService.delifee($scope);
  	};		
  	
  	$scope.orderCheckout = function(){
  		  $scope.showLoading();
  		  OrderService.checkout($scope);
  	};	
  	
 	$scope.delitypes = [
      { value: 0, name: "自取" },
      { value: 1, name: "送餐" },
      { value: 2, name: "订制运费" }
    ];
    
    
    
  	$scope.dltype = 1;
	$scope.showLoading();
	OrderService.readyList($scope);
    AddressService.all($scope);
      
})


.controller('HistoryCtrl', function($scope, $location, $ionicLoading, $http, $timeout, HistoryService, SystemService) {
	
 // Trigger the loading indicator
  	$scope.showLoading = function() {
  		$ionicLoading.show({
	        content: '数据获取中...',
	        animation: 'fade-in',
	        showBackdrop: true,
	        maxWidth: 200,
        // showDelay: 500
    	}); 
    };
    $scope.hideLoading = function(){
    	$ionicLoading.hide();
  	};	
    $scope.doRefresh = function() {
    	var page = $location.path();
    	if (page == '/tab/history') {
    		$scope.showLoading();
	    	HistoryService.load($scope,1);
	    	$timeout($scope.doRefresh, 60000);
	    }
	};

    $scope.recover = function() {
    	HistoryService.recover($scope);
	};

	
    $scope.status =  { text : null, badge : null}; 
	$scope.showLoading();
	HistoryService.load($scope,0);
	$timeout($scope.doRefresh, 60000);
})


.controller('ProfileCtrl', function($scope, SystemService) {
 	$scope.logout = function() {
		SystemService.logout($scope);
		
	}; 
})

.controller('AboutCtrl', function($scope) {

})
.controller('AddressCtrl', function($scope, $ionicLoading, $state, AddressService) {

// Hide the tab
    var tabs = document.querySelectorAll('div.tabs')[0];
    tabs = angular.element(tabs);
    tabs.css('display', 'none');
  //tabs.css('class', 'tabs-item-hide');
    $scope.$on('$destroy', function() {
      tabs.css('display', '');
    });
//  right Button 
	$scope.addButton = function() {
	      $state.go('tab.addradd');
	 };  
  
// data loadings  

    $scope.showLoading = function() {
    	$ionicLoading.show({
      		content: '地址获取中...',
      		animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
    	});
  	};
  	$scope.hideLoading = function(){
    	$ionicLoading.hide();
  	};
  	
  	$scope.showLoading();
  	
    AddressService.all($scope);
})




.controller('AddressAddCtrl', function($scope, $ionicLoading, $ionicModal, $state, AddressService) {
// Hide the tab
    var tabs = document.querySelectorAll('div.tabs')[0];
    tabs = angular.element(tabs);
    tabs.css('display', 'none');
  
    $scope.$on('$destroy', function() {
      tabs.css('display', '');
    });

})




.controller('AddressAddValidateCtrl', function($scope,  $ionicLoading, $ionicPopup, $ionicModal,$stateParams, AddressService) {

// Hide the tab
    var tabs = document.querySelectorAll('div.tabs')[0];
    tabs = angular.element(tabs);
    tabs.css('display', 'none');
    
    $scope.$on('$destroy', function() {
      tabs.css('display', '');
      $scope.modal.remove();
    });

	$scope.showLoading = function() {
  		$ionicLoading.show({
	        content: '地址验证中...',
	        animation: 'fade-in',
	        showBackdrop: true,
	        maxWidth: 200,
        // showDelay: 500
    	}); 
    };

  	$scope.hideLoading = function(){
    	$ionicLoading.hide();
  	};
  	
	$scope.showValidation = function(content) {
		$ionicPopup.alert({
		              title: '请检查以下错误',
		              content: content,
		              okText: '返回修改'
		            }).then(function(res) {
		                 // $state.go('login');
		            });
		};	
  	
// Address Validation by Google Map    
	$scope.validate = function() {
		$scope.showLoading();
		AddressService.validate($scope);
	};	

    $ionicModal.fromTemplateUrl('addr-validate-modal.html', function(modal) {
	    $scope.modal = modal;
	  }, {
	    // Use our scope for the scope of the modal to keep it simple
	    scope: $scope,
	    // The animation we want to use for the modal entrance
	    animation: 'slide-in-up'
	  });

	$scope.openModal = function() {
	    $scope.modal.show();
	  };
	$scope.closeModal = function() {
	    $scope.modal.hide();
	  };
	

	$scope.createAddr = function() {
		$scope.result = 0;
		$scope.showLoading();
		AddressService.create($scope);
	};
	
	$scope.addr =  { name : null, tel : null ,city : null, postal : null,addr : null};

})

;
