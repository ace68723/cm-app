// Ionic chanmao App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'chanmao' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'chanmao.services' is found in services.js
// 'chanmao.controllers' is found in controllers.js
angular.module('chanmao', ['ionic', 'chanmao.services', 'chanmao.controllers'])

.constant('constant', {'channel':2})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
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
     // .state('ordermenu', {
      // url: '/ordermenu',
      // // views: {
        // 'order-tab': {
          // templateUrl: 'templates/order-menu.html',
          // controller: 'OrderMenuCtrl'
        // }
      // // }
    // })  
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
      url: '/ordermenu',
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
          controller: 'OrderModifyCtrl'
        }
      }
    }) 
    .state('tab.ordercheckout', {
      url: '/ordercheckout',
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
          controller: 'AddressCtrl'
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
   
});



