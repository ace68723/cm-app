'use strict';

angular.module('chanmao')
  .controller('OrderCtrl', function($scope,$interval,$ionicFrostedDelegate,$ionicScrollDelegate,loadingService, scrollService,RRService) {
	
	RRService.rrlist($scope);
	 
	$scope.gotoRR = function(rid) { 
	  	RRService.gotoRR(rid);
	};  
	
	$scope.rrlist_refresh = function(){
	  	RRService.rrlist($scope);
	  	setTimeout(function() {
			$ionicScrollDelegate.resize();
			// if(window.cordova && window.cordova.platformId == 'ios'){	
			// 	$ionicFrostedDelegate.update();
			// }
	  	}, 	1500);
	  
	};

	loadingService.showLoading()
	setTimeout(function() {
		scrollService.scroll_refresh("order_scroll");
	}, 200);
	
	// $interval(function() {
	// 	scrollService.scroll_refresh("order_scroll");
	// },60000 * 15)
  	$scope.$on('$ionicView.beforeEnter', function(){ 
  		loadingService.reLoading()
  	});
})