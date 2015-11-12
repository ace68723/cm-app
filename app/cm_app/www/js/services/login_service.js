'use strict';

/**
 * @ngdoc service
 * @name helloIonicApp.addrService
 * @description
 * # addrService
 * Factory in the helloIonicApp.
 */
angular.module('chanmao')
.factory('LoginService', function($http, $state, $rootScope,$location, auth, loadingService,alertService, API_URL,version) {
  var errortext;
 return {
	login: function($scope, $ionicPopup) {  
		errortext = ''; 
		// console.log($scope.login.password)
	
	if (($scope.login.username == null) ||
		($scope.login.password == null)){
		errortext = '请按正确格式填写所有字段';
	}  
	   
	if (errortext != ''){         
		alertService.alert(errortext); 
	
	} else {  
		loadingService.showLoading();
		$http.post(API_URL+'MobLogin/login', { username: $scope.login.username, password: $scope.login.password,version:version })
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
				loadingService.hideLoading();   
		}).then(function(){
			if ($scope.result != 1){        
				errortext = '用户名和密码不匹配';  
				alertService.alert(errortext); 
			} else {
				// alertService.alert('成功'); 
				$location.path('/tab/history')

			}
			loadingService.hideLoading();     
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
	  errortext = '请按正确格式填写所有字段';
	if ($scope.register.password != $scope.register.password2)
	  errortext = errortext + '两次输入的密码不一致';
	if ($scope.register.email != $scope.register.email2)
	  errortext = errortext + '两次输入的Email不一致';
	if (errortext != ''){         
	  alertService.alert(errortext); 
	} else {  
		loadingService.showLoading();    
		$http.post(API_URL+'MobLogin/register', { username: $scope.register.username, password: $scope.register.password, email: $scope.register.email })
		.success(function(data, status, headers, config) {
			$scope.result = data.result;  
			if (data.result == 2){
				errortext = data.errorcontent;
			}
				  
		}).error(function(data, status) { 
			$rootScope.noNetwork(); 
			loadingService.hideLoading();
		}).then(function(){
			if ($scope.result == 1){         
				alertService.alert('成功'); 
		 	} else if ($scope.result == 2){  
		  		alertService.alert(errortext); 
			}  
			loadingService.hideLoading();     
		}); 
	  }
	},    
 
	forget: function($scope, $ionicPopup, mode) { 
	  errortext = ""; 
	if ($scope.forget.email == null )
	  errortext = '请按正确格式填写所有字段';
	if (errortext != ''){         
	  alertService.alert(errortext); 
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
			alertService.alert(errortext); 
		 }      
			 }); 
	 }
	},
  };
})
