// Ionic chanmao App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'chanmao' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'chanmao.services' is found in services.js
// 'chanmao.controllers' is found in controllers.js
angular.module('chanmao', ['ionic','ionic.service.core', 'ngIOS9UIWebViewPatch','ionic.contrib.frostedGlass','ngCordova','chanmao.services', 'chanmao.controllers'])


// .run(function($ionicPlatform, $rootScope, $cordovaSplashscreen,$cordovaNetwork,$cordovaDialogs,$timeout) {
.constant('version', '1.1.5')
.run(function($rootScope,$location,$ionicPlatform,$ionicFrostedDelegate,$ionicHistory,$cordovaGeolocation,$cordovaNetwork,auth,alertService,loadingService){
  $ionicPlatform.ready(function() {


	setTimeout(function() {
		navigator.splashscreen.hide();
	}, 2000);

	Ionic.io();
	var deploy = new Ionic.Deploy();
	$rootScope.doUpdate = function() {
		loadingService.showUpdate()
		deploy.update().then(function(res) {
		 console.log('Ionic Deploy: Update Success! ', res);
		 loadingService.hideLoading()
		 auth.doAuth()
		}, function(err) {
		 console.log('Ionic Deploy: Update error! ', err);
		 loadingService.hideLoading()
		 auth.doAuth()
		 // alertService.alert("更新失败","#_#")
		}, function(prog) {
			$rootScope.$evalAsync(function () {
				$rootScope.prog = prog;
			})
		 console.log('Ionic Deploy: Progress... ', prog);
		});
	};
		 // Check Ionic Deploy for new code
	$rootScope.checkForUpdates = function() {
		console.log('Ionic Deploy: Checking for updates');
		deploy.check().then(function(hasUpdate) {
			console.log('Ionic Deploy: Update available: ' + hasUpdate);
			
				$rootScope.hasUpdate = hasUpdate;
			
			
			if(hasUpdate){
				$rootScope.doUpdate();
			}else{
				auth.doAuth()
			}
			
		}, function(err) {
			console.error('Ionic Deploy: Unable to check for updates', err);
		});
	};

	// cordova.plugins.market.open("itms-apps://itunes.apple.com/app/id888553991")
	
	

	// var push = new Ionic.Push({});

	// push.register(function(token) {
	//   // Log out your device token (Save this!)
	//   console.log("Got Token:",token.token);
	// });

	
	if (window.cordova && window.cordova.plugins.Keyboard) {
		cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		cordova.plugins.Keyboard.disableScroll(true);

	}
	console.log(window.cordova.platformId)
	if(window.cordova){
		if(window.cordova.platformId == 'ios'){
			auth.setChannel(1)
			$rootScope.checkForUpdates();
		}else if (window.cordova.platformId == 'android'){
			auth.setChannel(2)
			auth.doAuth()
		}

		auth.get_cur_position()
	}else{
		auth.setChannel(99)
	}
	// $routeUpdate   $locationChangeSuccess routeChangeStart
	// var tabs;
	// setTimeout(function() {
	// 	tabs = document.querySelectorAll('div.tabs')[0];
	// 	tabs = angular.element(tabs);
	// 	tabs.addClass("animated");
	// 	tabs.addClass("slideInUp");
	// },100);
	$rootScope.$on('$locationChangeStart', function(event){
			var url = $location.url(),
				params = $location.search();
				// console.log(url)
				//update header when location change
				$ionicFrostedDelegate.update();
				// console.log(url)
				// var url_master = url.split('/');
				var tabs = document.querySelectorAll('div.tabs')[0];
					tabs = angular.element(tabs);
					tabs.addClass("animated");
				if(url == "/tab/history" || url == "/tab/profile" || url == "/tab/order" ){
					if(tabs.hasClass("slideOutDown")){
						tabs.removeClass("slideOutDown")
						tabs.addClass("slideInUp");
					}
				}else{
					if(tabs.hasClass("slideInUp")){
						tabs.removeClass("slideInUp")
					}
					tabs.addClass("slideOutDown");
				}
	})

	$rootScope.go_back = function() {
		$ionicHistory.goBack()
	};

	


  });

})
.config(function($stateProvider, $urlRouterProvider,$httpProvider,$ionicConfigProvider) {
	$ionicConfigProvider.tabs.style('standard');
	$ionicConfigProvider.tabs.position('bottom');
	$ionicConfigProvider.platform.android.scrolling.jsScrolling(false)
	

  $stateProvider
	.state('login', {
	  url: "/login",
	  templateUrl: "templates/login.html",
	  controller: 'LoginCtrl'
	})
	
	.state('register', {
	  url: "/register",
	  templateUrl: "templates/login-register.html",
	  controller: 'LoginCtrl'
	})
	
	.state('forget', {
	  url: "/forget",
	  templateUrl: "templates/login-forget.html",
	  controller: 'LoginCtrl'
	})
   
	.state('logindone', {
	  url: "/logindone",
	  templateUrl: "templates/login-done.html",
	  controller: 'LoginDoneCtrl'
	})
	.state('tab', {
	  url: "/tab",
	  abstract: true,
	  templateUrl: "templates/tabs.html"
	})

	.state('tab.order', {
	  url: '/order',
	  views: {
		'order-tab': {
		  templateUrl: 'templates/order.html',
		  controller: 'OrderCtrl'
		}
	  }
	})
	
	.state('tab.ordermenu', {
	  url: '/order/menu/:rid',
	  views: {
		'order-tab': {
		  templateUrl: 'templates/order-menu.html',
		  controller: 'OrderMenuCtrl'
		}
	  }
	})      
	.state('tab.ordermodify', {
	  url: '/ordermodify',
	  views: {
		'order-tab': {
		  templateUrl: 'templates/order-modify.html',
		  controller: 'OrderMenuCtrl'
		}
	  }
	}) 
	.state('tab.ordercheckout', {
	  url: '/order/ordercheckout',
	  views: {
		'order-tab': {
		  templateUrl: 'templates/order-checkout.html',
		  controller: 'OrderCheckoutCtrl'
		}
	  }
	}) 
	.state('tab.add_address', {
	  url: '/order/add_address',
	  views: {
		'order-tab': {
		  templateUrl: 'templates/menu_address_add.html',
		  controller: 'AddressAddValidateCtrl'
		}
	  }
	}) 
	.state('tab.history', {
	  url: '/history',
	  views: {
		'history-tab': {
		  templateUrl: 'templates/history.html',
		  controller: 'HistoryCtrl'
		}
	  }
	})

	.state('tab.profile', {
	  url: '/profile',
	  views: {
		'profile-tab': {
		  templateUrl: 'templates/profile.html',
		  controller: 'ProfileCtrl'
		}
	  }
	})
	 .state('tab.about', {
	  url: '/about',
	  views: {
		'profile-tab': {
		  templateUrl: 'templates/profile-about.html',
		  controller: 'AboutCtrl'
		}
	  }
	})   
	.state('tab.address', {
	  url: '/address',
	  views: {
		'profile-tab': {
		  templateUrl: 'templates/profile-address.html',
		  controller: 'AddressCtrl as ac'
		}
	  }
	})
	.state('tab.addradd', {
	  url: '/addradd',
	  views: {
		'profile-tab': {
		  templateUrl: 'templates/profile-address-add.html',
		  controller: 'AddressAddCtrl'
		}
	  }
	})
	.state('tab.editradd', {
		url: '/editradd',
		views: {
			'profile-tab': {
			templateUrl: 'templates/profile-address-edit.html',
			controller: 'AddressAddCtrl'
			}
		}
	})  

	// .state('tab.about', {
	  // url: '/about',
	  // views: {
		// 'about-tab': {
		  // templateUrl: 'templates/about.html',
		  // controller: 'AboutCtrl'
		// }
	  // }
	// })
	
	;

  // if none of the above states are matched, use this as the fallback
   $urlRouterProvider.otherwise('/login');
   // $urlRouterProvider.otherwise('/tab/history');

   $httpProvider.interceptors.push('authInterceptor');
   
})
.constant('API_URL', 'https://www.chanmao.ca/index.php?r=');//api url constant
;



