'use strict';

angular.module('chanmao')
.controller('OrderCheckoutCtrl', function($scope, $state, $location, $ionicPopup, $ionicLoading, OrderService, AddressService,loadingService) {

  
  $scope.showLoading = function() {
      $ionicLoading.show({
          content: '数据提交中...',
          animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
      });
    };
    $scope.hideLoading = function(){
      $ionicLoading.hide();
    };
  
  $scope.showExceed = function() {
    $ionicPopup.alert({
                  title: '请注意',
                  content: '您的地址已超出普通送餐范围，只能选择订制运费',
                  okText: '好的，我了解'
                }).then(function(res) {
                     // $state.go('login');  
                  
                          $scope.select.selected_dltype =  2;
                            
                });
    };    
  
  $scope.showSuccess = function(content) {
    $ionicPopup.alert({
                  title: '订单提交成功',
                  content: content,
                  okText: '好的'
                }).then(function(res) {
                  $state.go('tab.history', null, { reload: true });
                });
    };
  $scope.showError = function(content) {
    $ionicPopup.alert({
                  title: '请注意',
                  content: content,
                  okText: '好的'
                }).then(function(res) {
                     // $state.go('tab.history');
                });
    };      
    $scope.dltypeChange = function(delitype){
      $scope.dltype = $scope.select.selected_dltype;
      $scope.deliChange();//$scope.dltype, $scope.uaid); 
    };  
    $scope.uaidChange = function(addr){
      $scope.selected_addr = JSON.parse(addr);
      $scope.uaid = $scope.selected_addr.uaid;
      $scope.select.selected_dltype = 1
      $scope.dltype = $scope.select.selected_dltype; // init dltype
      $scope.deliChange();
    };  
    
    $scope.deliChange = function(){
       // console.log($scope.dltype, $scope.uaid);
      if ($scope.uaid != null) OrderService.delifee($scope);
    };    
    
    $scope.orderCheckout = function(){
        loadingService.showLoading()
        OrderService.checkout($scope);
    };  
    $scope.select = {}
    $scope.select.delitypes = [
        { value: 0, name: "自取" },
        { value: 1, name: "送餐" },
        { value: 2, name: "订制运费" }
    ];
   
    
    
    
    $scope.dltype = 1;
  // $scope.showLoading();
  // OrderService.readyList($scope);
    $scope.order    = OrderService.get_order()
    $scope.dishes   = $scope.order.dishes;
    $scope.totalpre = $scope.order.total;
    AddressService.all($scope);
      
})


