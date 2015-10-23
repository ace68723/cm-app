'use strict';

angular.module('chanmao')
	.controller('AddressAddValidateCtrl', function($scope,  $ionicLoading, $ionicPopup, $ionicModal,$stateParams, loadingService,AddressService) {

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
			loadingService.showLoading()
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
			loadingService.showLoading()
			AddressService.create($scope);
		};
		$scope.addr_delete = function(addr) {
			console.log(addr)
			console.log(AddressService.addr_delete())
			AddressService.addr_delete(addr)

		};
		
		$scope.addr =  { name : null, tel : null ,city : null, postal : null,addr : null};



	})