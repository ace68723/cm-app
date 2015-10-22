'use strict';

angular.module('chanmao')
  .controller('LoginCtrl', function($scope, $state,auth) {
   	uid = window.localStorage.getItem("sv_uid");  
  	if (uid != null){
  		$state.go('tab.history');
  	}
  	//  new version 

  	$scope.isInstalledWechat = function() {
  		Wechat.isInstalled(function (installed) {
  		    alert("Wechat installed: " + (installed ? "Yes" : "No"));
  		}, function (reason) {
  		    alert("Failed: " + reason);
  		});
  	};
  	
  	$scope.wechat_login = function() {
  		auth.doWechatAuth()
  	};
  })
