'use strict';

angular.module('chanmao')
.controller('AddressCtrl', function($scope, $ionicLoading, $state,loadingService,AddressService) {
	var ac = this;

	 $scope.addButton = function() {
			 $state.go('tab.addrSearch');
		};


	$scope.hideLoading = function(){
		$ionicLoading.hide();
	};

	$scope.addr_delete = function(addr,$index) {
			console.log(addr,$index)
			$scope.address.splice($index,1)
			AddressService.addr_delete(addr)
	}
	// loadingService.showLoading();
	$scope.test = {}
	$scope.show_address_list = false;
	AddressService.all($scope);

})
