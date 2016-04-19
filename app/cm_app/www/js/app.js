// Ionic chanmao App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'chanmao' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'chanmao.services' is found in services.js
// 'chanmao.controllers' is found in controllers.js
angular.module('chanmao', ['ionic','ionic.service.core', 'ngIOS9UIWebViewPatch','ionic.contrib.frostedGlass','ngCordova','chanmao.services', 'chanmao.controllers'])


// .run(function($ionicPlatform, $rootScope, $cordovaSplashscreen,$cordovaNetwork,$cordovaDialogs,$timeout) {
.constant('version', '1.1.15')
.run(function($rootScope,$location,$ionicPlatform,$ionicTabsDelegate,$ionicFrostedDelegate,$ionicHistory,$cordovaGeolocation,$cordovaNetwork,auth,alertService,loadingService){
  $ionicPlatform.ready(function() {


	// setTimeout(function() {
	// 	navigator.splashscreen.hide();
	// }, 2000);

	Ionic.io();

	var deploy = new Ionic.Deploy();

	$rootScope.doUpdate = function() {
		loadingService.showUpdate()
		deploy.update().then(function(res) {
		 	loadingService.hideLoading()
			 	setTimeout(function() {
			 		auth.doAuth()
			 	}, 3000);
		}, function(err) {
		 	loadingService.hideLoading()
			 	setTimeout(function() {
			 		auth.doAuth()
			 	}, 3000);
		}, function(prog) {
			$rootScope.$evalAsync(function () {
				$rootScope.prog = prog;
			})
		});
	};

	$rootScope.checkForUpdates = function() {
		deploy.check().then(function(hasUpdate) {
			$rootScope.hasUpdate = hasUpdate;

			if(hasUpdate){
				$rootScope.doUpdate();
			}else{
				setTimeout(function() {
						auth.doAuth()
				}, 3000);
			}
		}, function(err) {

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
	if(window.cordova){
		navigator.splashscreen.hide();
		auth.isWechatInstalled()
		.then(function(result) {
			$rootScope.isWechatInstalled = result;
			console.log($rootScope.isWechatInstalled)
		})

		if(window.cordova.platformId == 'ios'){
			auth.setChannel(1)
			$rootScope.checkForUpdates();
			// auth.doAuth()
		}else if (window.cordova.platformId == 'android'){
			auth.setChannel(2)
			loadingService.showUpdate()
			setTimeout(function() {
				auth.doAuth()
			}, 3000);
		}


		auth.get_cur_position()
	}else{
		auth.setChannel(99)
	}

	$rootScope.$on('$locationChangeStart', function(event){

		var url = $location.url(),
			params = $location.search();
		if(window.cordova && window.cordova.platformId == 'ios'){
			setTimeout(function() {
				$ionicFrostedDelegate.update();
			}, 1000);
		}

		// setTimeout(function() {
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
		// }, 500);

	})

	$rootScope.go_back = function() {
		$ionicHistory.goBack()
	};


	$rootScope.selectTabWithIndex = function(index) {

    	// $ionicTabsDelegate.select(index);
    	if(index == 1){
    		$location.url("/tab/order")

    	}else if(index == 2){
    		$location.url("/tab/history")
    	}else if(index == 3){
    		$location.url("/tab/profile")
    	}

  	}

  });

})
.config(function($stateProvider, $urlRouterProvider,$httpProvider,$ionicConfigProvider) {
	$ionicConfigProvider.tabs.style('standard');
	$ionicConfigProvider.tabs.position('bottom');
	// $ionicConfigProvider.platform.android.scrolling.jsScrolling(false)


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
  .state('tab.addrSearch', {
    url: '/addrSearch',
    views: {
      'profile-tab': {
        templateUrl: 'templates/profile-address-search.html',
        controller: 'AddressCtrl as ac'
      }
    }
  })
	.state('tab.addradd', {
	  url: '/addradd',
	  views: {
		'profile-tab': {
		  templateUrl: 'templates/profile-address-add.html',
		  controller: 'AddressAddValidateCtrl'
		}
	  }
	})
  .state('tab.search_address', {
    url: '/order/search_address',
    views: {
    'order-tab': {
      templateUrl: 'templates/menu_address_search.html',
      controller: 'AddressCtrl as ac'
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
	.state('tab.editradd', {
		url: '/editradd',
		views: {
			'profile-tab': {
			templateUrl: 'templates/profile-address-edit.html',
			controller: 'AddressAddCtrl'
			}
		}
	})
	;

   $urlRouterProvider.otherwise('/login');

   $httpProvider.interceptors.push('authInterceptor');

})
.constant('API_URL', 'https://www.chanmao.ca/index.php?r=');
// .constant('API_URL', 'http://cmtest.littlesailing.com/index.php?r=');
;
