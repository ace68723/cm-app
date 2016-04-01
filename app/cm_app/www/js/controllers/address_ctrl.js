'use strict';

angular.module('chanmao')
.controller('AddressCtrl', function($scope, $ionicLoading, $state,loadingService,AddressService) {
	var ac = this;
// Hide the tab
	// var tabs = document.querySelectorAll('div.tabs')[0];
	// tabs = angular.element(tabs);
	// tabs.css('display', 'none');
 //  //tabs.css('class', 'tabs-item-hide');
	// $scope.$on('$destroy', function() {
	//   tabs.css('display', '');
	// });
//  right Button
	// $scope.addButton = function() {
	// 	  $state.go('tab.addradd');
	//  };

	 $scope.addButton = function() {
			 $state.go('tab.addrSearch');
		};

// data loadings


	$scope.hideLoading = function(){
		$ionicLoading.hide();
	};
	// $scope.addr_edit = function(addr) {
	// 	AddressService.save_addr(addr)
	// 	$state.go('tab.editradd');
	// };

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
