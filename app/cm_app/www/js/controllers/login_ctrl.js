'use strict';

angular.module('chanmao')
  .controller('LoginCtrl', function($scope, $state,auth) {
    // var uid = window.localStorage.getItem("sv_uid");  
    // if (uid != null){
    //   $state.go('tab.history');
    // }
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