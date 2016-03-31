'use strict';

/**
 * @ngdoc service
 * @name helloIonicApp.addrService
 * @description
 * # addrService
 * Factory in the helloIonicApp.
 */
angular.module('chanmao')
.factory('AddressService', function($http,$q, $state,$rootScope,loadingService,alertService,API_URL) {
	var AddressService = {};
	var editing_addr;
	var uid;
	var editing_addr;


	AddressService.all=function($scope) {
	  // uid = window.localStorage.getItem("sv_uid");
	  $http.get(API_URL+'MobAddress10/addresslist')
	  .success(function(data, status, headers, config) {
			// alert(data.result)
			if (data.result == 0){
					$rootScope.address = data.address;
					console.log('$scope.address',$rootScope.address)
			}
			$scope.show_address_list = true;
				TweenMax.fromTo('#address', 1, {
				  "margin-top": "100%",
				},
				{
				   "margin-top": "0",
				});

			 // $scope.loadingIndicator.hide();
		   }).error(function(data, status) {
			   $rootScope.noNetwork();
		   }).then(function() {
			loadingService.hideLoading()
		   });
	};

	AddressService.exist=function($scope) {
	  // uid = window.localStorage.getItem("sv_uid");
	  var exist = 0;
	  $http.get(API_URL+'MobAddress10/addressexist')
	  .success(function(data, status, headers, config) {
			if (data.result == 0)
			exist = data.exist;
		   }).error(function(data, status) {
				 $rootScope.noNetwork();
		   }).then(function(){
			  $scope.exist = exist;
			  loadingService.hideLoading()
		   });
	};

  AddressService.validate=function($scope) {
	var errortext = '';
	if (($scope.addr.name   == null) ||
		($scope.addr.tel    == null) ||
		($scope.addr.city   == null) ||
		($scope.addr.postal == null) ||
		($scope.addr.addr   == null) ){
		errortext = '* 请按正确格式填写所有字段<br>';
	}

	if (errortext != ''){
		alertService.alert(errortext);
		loadingService.hideLoading()
	} else  {
		$scope.addr.postal = null
		var address_str = $scope.addr.addr+'+'+$scope.addr.city+'+ON';
		address_str = address_str.replace(/\s/g,"+");
		var geocoder = new google.maps.Geocoder();
		var geocoderRequest = { address: address_str };
		geocoder.geocode(geocoderRequest, function(results, status){
			if (status == 'OK'){

				// $scope.addr.address = results[0]['formatted_address'];
				$scope.addr.lat 	= results[0].geometry.location.lat();
				$scope.addr.lng 	= results[0].geometry.location.lng();

				var address_components = results[0].address_components;
				_.forEach(address_components, function(component, key) {
					_.forEach(component.types, function(type, key) {
						switch(type) {
							case "postal_code":
								$scope.addr.postal = component.long_name;
								break;
							case "locality":
								$scope.addr.city = component.long_name;
								break;
							case "route":
								$scope.addr.route = component.long_name;
								break;
							case "street_number":
								$scope.addr.street_number = component.long_name;
								break;

						}
					});
				});

				$scope.addr.address = $scope.addr.street_number + " " + $scope.addr.route;
				console.log($scope.addr.address)
				if(!$scope.addr.postal){
					$scope.addr.address = "系统无法检测到您的地址，请返回重新检查地址格式";
				}

		  } else {
			$scope.addr.address = "系统无法检测到您的地址，请返回重新检查地址格式";
		  }
			console.log("service_inner"+$scope.addr.address+"service_inner"+$scope.addr.lat+$scope.addr.lng);
			$scope.openModal();
			loadingService.hideLoading()
		});
	}
  };
  	AddressService.create=function($scope) {
		// $scope.addr.uid = window.localStorage.getItem("sv_uid");
		return $q(function(resolve, reject) {
	      	$scope.addr.addr = $scope.addr.address
	      	$http.post(API_URL+'MobAddress10/Addresscreate',  $scope.addr )
	    		.success(function(data, status, headers, config) {
	    			if (data.result == 0)
	    			$scope.result = data.result;
	    			resolve(' ');
	    		}).error(function(data, status) {
	    			$rootScope.noNetwork();
	    			 reject('');
	    		}).then(function(){
	    			if ($scope.result == 0){
	    				$scope.closeModal();
	    				// AddressService.all()
	    				// $state.go('tab.address');
	    				$rootScope.go_back()
	    			}
	    			loadingService.hideLoading()
	    		});
		});

	};
	AddressService.save_addr = function(addr) {
		editing_addr = addr;
	};
	AddressService.get_addr = function() {
		return editing_addr;
	};
	AddressService.addr_delete = function(addr) {
		// console.log(addr)
		var uaid = addr.uaid
		var data = {};
		data.uaid = uaid;
		data.del = "1";
		$http.post(API_URL+'MobAddress10/Addressupdate', data)
		.success(function(data, status, headers, config) {
			  if (data.result == 0){

			  }
			 }).error(function(data, status) {
				 $rootScope.noNetwork();
			 }).then();
	}


   return AddressService;

})
