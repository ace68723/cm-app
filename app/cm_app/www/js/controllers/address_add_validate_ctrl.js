'use strict';

angular.module('chanmao')
	.controller('AddressAddValidateCtrl', function($scope,  $ionicLoading, $ionicPopup, $ionicModal,$stateParams, loadingService,AddressService) {
		$scope.$on('$ionicView.enter', function() {
				get_search_result();
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
			loadingService.showLoading()
			AddressService.validate($scope);
		};

		$scope.createAddr = function() {
			loadingService.showLoading()
			AddressService.create($scope)
				.then(function() {
					AddressService.all($scope)
				});
		};
		$scope.addr_delete = function(addr) {
			AddressService.addr_delete(addr)

		};

		$scope.addr =  { name : null, tel : null ,city : null, postal : null,addr : null};
		function get_search_result() {
			// $scope.search_result = AddressService.get_search_result()
			// console.log($scope.search_result)
			AddressService.get_search_result()
					.then(function (addr) {
							$scope.addr = addr;
					})
					.catch(function (error) {
							$scope.search_result = error;
					})
		}




	})
