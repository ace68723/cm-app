'use strict';

angular.module('chanmao')
.controller('OrderCheckoutCtrl', function($scope, $state, $location, $ionicPopup, $ionicLoading, OrderService, AddressService,loadingService) {
  $scope.$on('$ionicView.enter', function() {
      OrderService.beforeCheckout($scope.totalpre)
        .then(function (data) {
          $scope.promoted = data.promoted;
          $scope.total = data.total;
          $scope.pretax = data.pretax;
          $scope.pretax_ori = data.pretax_ori;
        })
        .catch(function (error) {

        });
        $scope.checkout={
          coupon:''
        }

  });
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
						  $scope.select.selected_dltype =  2;

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
	$scope.dltypeChange = function(){

    $scope.dltype = $scope.select.selected_dltype;
    $scope.deliChange();

	};
	$scope.uaidChange = function(addr){

	  $scope.selected_addr = JSON.parse(addr);
	  $scope.uaid = $scope.selected_addr.uaid;

	  if ($scope.totalpre >= 30) {
        if(!$scope.select.selected_dltype){
          	$scope.select.selected_dltype = '1';
        }
	  }else{
      $scope.select.selected_dltype = '0';
    }
    $scope.deliChange();
	};

	$scope.deliChange = function(){
	  if ($scope.uaid != null){
        $scope.dltype = $scope.select.selected_dltype;
      console.log($scope.dltype)
        OrderService.delifee($scope.uaid,$scope.pretax_ori,$scope.dltype,$scope.checkout.coupon)
          .then(function (data) {
            $scope.pretax = data.pretax;
            $scope.dlexp  = data.dlexp;
            $scope.total  = data.total;
            switch (data.dltype) {
              case 0:
                  if(data.pretax_ori > 30){
                    $scope.select.delitypes = [
                      { value: '0', name: "自取" },
                      { value: '1', name: "送餐" },
                    ];
                  }else{
                    $scope.select.delitypes = [
                      { value: '0', name: "自取" }
                    ];
                  }
                  $scope.select.selected_dltype = '0';
                break;
              case 1:
                    $scope.select.delitypes = [
                      { value: '0', name: "自取" },
                      { value: '1', name: "送餐" },
                    ];
                    $scope.select.selected_dltype = '1';
                 break;
              case 2:
                      $scope.select.delitypes = [
                        { value: '0', name: "自取" },
                        { value: '2', name: "订制运费" },
                      ];
                      $scope.select.selected_dltype = '2';
                  break;
              default: return
            }
          })
          .catch(function () {

          });
    }

	};

	$scope.orderCheckout = function(){
		loadingService.showLoading()
		if($scope.dltype != 1){
		  $scope.dlexp = 0
		}
		OrderService.checkout($scope);
	};

	$scope.select_focus = function() {
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
		}
	};
	$scope.select_blur = function() {
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
	};
	$scope.select = {}





	// $scope.dltype = 1;
  // $scope.showLoading();
  // OrderService.readyList($scope);
  $scope.order    = OrderService.get_order()
  $scope.dishes   = $scope.order.dishes;
  $scope.totalpre = $scope.order.total;
  if ($scope.totalpre >= 30) {
    $scope.select.delitypes = [
      { value: '0', name: "自取" },
      { value: '1', name: "送餐" }
    ];
  } else{
    $scope.select.delitypes = [
      { value: '0', name: "自取" }
    ];
    $scope.select.selected_dltype = 0
  };
	AddressService.all($scope);

})
