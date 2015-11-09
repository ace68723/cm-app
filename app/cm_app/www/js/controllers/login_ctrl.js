'use strict';

angular.module('chanmao')
  .controller('LoginCtrl', function($scope, $state,auth) {

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


	//******************************
	// anmiations
	//******************************
	var logo_mockup = document.getElementsByClassName("logo_mockup");
	var logo 		= document.getElementsByClassName("chanmao-logo");
	var cm_form 	= document.getElementsByClassName("cm-form");
	var cm_login 	= document.getElementsByClassName("cm-login");
	var cm_register = document.getElementsByClassName("cm-register");
	var cm_wechat 	= document.getElementsByClassName("cm-wechat");
	var copyright  	= document.getElementsByClassName("copyright");

	TweenMax.set(logo, {"opacity":0});
	TweenMax.set(cm_form,{"left":"110%"});
	TweenMax.set(cm_login,{"left":"110%"});
	TweenMax.set(cm_register,{"left":"110%","position": "relative"});
	TweenMax.set(cm_wechat,{"opacity":0,"display":"none"});
	TweenMax.set(copyright,{"top":"20px","position": "relative"});

	var tl = new TimelineLite();
	tl.add(	TweenMax.to(logo_mockup, 3, {"opacity":0}),8)
	tl.add(	TweenMax.to(logo, 5, {"opacity":1}),9);
	tl.add( TweenMax.to(cm_form,1,{ ease: Power2.easeIn, "left": "0" }),10)
	tl.add( TweenMax.to(cm_login,1,{ ease: Power2.easeIn, "left": "0" }),10.5)
	tl.add( TweenMax.to(cm_register,1,{ ease: Power2.easeIn, "left": "0" }),11)
	tl.add( TweenMax.to(cm_wechat,0.1,{ ease: Power2.easeIn, clearProps:"display" }),11)
	tl.add( TweenMax.to(cm_wechat,1,{ ease: Power2.easeIn, "opacity":1 }),11.5)
	tl.add( TweenMax.to(copyright,1,{ ease: Power2.easeIn, "top": "0" }),12)
	tl.add(	TweenMax.to(logo_mockup, 3, {"display":"none"}),11)
	// tl.add( TweenMax.to(logo, 3, {opacity:0}));
	
  })

  .controller('LoginFormCtrl', function( $scope, $state, $ionicLoading, $ionicPopup, LoginService,loadingService, $window) {
	$scope.showSuccess = function() {
	  
		// $state.go('tab.history');
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
	  // $scope.showLoading();
	  loadingService.showLoading();
	  LoginService.login($scope, $ionicPopup);
	};  


  })