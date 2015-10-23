'use strict';

angular.module('chanmao')
  .controller('OrderMenuCtrl', function($scope, $state, $stateParams,$location,$timeout, $ionicLoading, $ionicModal,$ionicScrollDelegate, RRService,OrderService,$rootScope) {
  // Hide the tab
      // var tabs = document.querySelectorAll('div.tabs')[0];
      // tabs = angular.element(tabs);
      // tabs.css('display', 'none');
   // Trigger the loading indicator
   
   // Hide the tab
       var tabs = document.querySelectorAll('div.tabs')[0];
       tabs = angular.element(tabs);
       tabs.css('display', 'none');
     //tabs.css('class', 'tabs-item-hide');
       $scope.$on('$destroy', function() {
         tabs.css('display', '');
       });

    var order_menu_scroll = $ionicScrollDelegate.$getByHandle('order_menu_scroll')
      $scope.showLoading = function() {
      $ionicLoading.show({
          template: '<img src="http://cmtest.littlesailing.com/img/chanmao_logo.gif"style="height: 10%;"> </br>快到碗里来...'
      });
      };
      $scope.showLoading()
      $scope.$on('$destroy', function() {
        // tabs.css('display', '');
        $scope.modal.remove();
        
      });

      $scope.open_dstype = function(dstype) {
        dstype.open = ! dstype.open
        // order_menu_scroll.freezeScroll(true)
          setTimeout(function() {
            order_menu_scroll.resize()
            // order_menu_scroll.freezeScroll(false)
          });

      };
      
    $scope.gotoModify = function() {
      if ($scope.totaldish == 0) $rootScope.message('注意', '当前还没点任何菜品'); 
       else $state.go('tab.ordermodify');
    };    
              
      $scope.amountAdd = function(){
        if ($scope.amount < 10)
        $scope.amount = $scope.amount + 1;
      };
      
      $scope.amountRemove = function(){
        if ($scope.amount > 1)
        $scope.amount = $scope.amount - 1;
      };
    
    $scope.order = function(ds_id, int_no, ds_name, price) {
      $scope.amount = 1;
      $scope.ds_id = ds_id;
      $scope.int_no = int_no;
      $scope.ds_name = ds_name;
      $scope.price = price;
      $scope.openModal();
    };
       
      $ionicModal.fromTemplateUrl('order-menu-modal.html', function(modal) {
        $scope.modal = modal;
      }, {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
      });

    $scope.openModal = function() {
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };    
      
    $scope.dishAdd = function(ds_id,amount,int_no,ds_name,price) {
      RRService.dishadd($scope,ds_id,amount,int_no,ds_name,price);
    };    
    
    
      RRService.rrmenu($scope);
    if ($scope.totaldish == null) $scope.totaldish = 0;
//************************
//scroll
//************************
    var k = 0;
    $scope.menu_scroll = function(position) {
        // console.log($ionicScrollDelegate.$getByHandle('menu').getScrollView())
        $scope.$evalAsync(function() {
              $scope.position_top = $ionicScrollDelegate.$getByHandle('order_menu_scroll').getScrollPosition().top
            });

        if(!!position){
            $scope.position_top = position;
            console.log('position',position)    
        }

        $timeout(function() {
            var cur_cat_id = _.findLastIndex($scope.cate, function(cate) {
               return $scope.position_top >(cate.menu_position-20)
            });
            if(cur_cat_id == -1){
                cur_cat_id = 0
            }
            // console.log('$scope.position_top',$scope.position_top,cur_cat_id)
            
            if (cur_cat_id !== k) {
                console.log('cur_cat_id',cur_cat_id,'k',k)
                $scope.cate[cur_cat_id].current = true;
                $scope.cate[k].current = false;
                var anchor = "anchor_nav" + cur_cat_id
                var nav_position    = getOffset(document.getElementById(anchor)).left-55;
                console.log(getOffset(document.getElementById(anchor)).left)
                var nav_width       = document.getElementById(anchor).offsetWidth  
                TweenMax.staggerTo(".nav_btn", 0.5, {left: nav_position+ 51.5 +'px',width:nav_width + 3+'px'}, 0.1);
                console.log(nav_position)
                console.log($ionicScrollDelegate.$getByHandle('Nav').getScrollView())
                var touch_left = $ionicScrollDelegate.$getByHandle('Nav').getScrollView().__initialTouchLeft;
                var touch_right = touch_left + $scope.divice_width
                console.log(touch_left,touch_right )
                if (touch_left< nav_position && nav_position<touch_right) {

                }else if(cur_cat_id >k){
                    $ionicScrollDelegate.$getByHandle('Nav').scrollTo(nav_position-$scope.divice_width*0.5, 0, true)
                }else if(cur_cat_id < k ){
                    $ionicScrollDelegate.$getByHandle('Nav').scrollTo(nav_position, 0, true)
                }
                
                k = cur_cat_id;
            };
        },100)
    };
    
    function getOffset( el ) {
        var _x = 0;
        var _y = 0;
        while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
            _x += el.offsetLeft - el.scrollLeft;
            _y += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
        }
        return { top: _y, left: _x };
    }

    var menu_position
    $scope.nav_click = function(anchor_nav) {
        // menu_position = getOffset( document.getElementById(anchor)).top-43; 
        menu_position = _.result(_.findWhere($scope.cate, { 'anchor_nav': anchor_nav}), 'menu_position');
        
        if(anchor_nav == 'anchor_nav0' ){
            $ionicScrollDelegate.$getByHandle('order_menu_scroll').scrollTop(true)
            $scope.menu_scroll(menu_position)
          
        }else{
            $ionicScrollDelegate.$getByHandle('order_menu_scroll').scrollTo(0, menu_position, true)
            $scope.menu_scroll(menu_position)
        } 
    };

//************************
// dish
//************************
    $scope.confirm_dish = []
    $scope.add_dish = function(dish) {
        if(!$scope.disable_add){
            dish.amount +=1
            var dish_id = dish.dish_id;
            if(!!dish.confirm_index || dish.confirm_index == 0){
                $scope.confirm_dish[dish.confirm_index].amount = dish.amount
            }else{
                var item = {}
                item.dish_id    = dish.dish_id 
                item.ds_name    = dish.ds_name;
                item.dish_price = dish.dish_price;
                item.amount     = dish.amount;
                item.int_no     = dish.int_no;
                item.menu_dish  = dish;
                dish.confirm_index = $scope.confirm_dish.length;
                $scope.confirm_dish.push(item);
            }
            if(!$scope.total){
                $scope.total = 0
            }
            $scope.total += Number(dish.dish_price)
            console.log($scope.confirm_dish)
        }
    };
    $scope.dec_dish = function(dish) {
        $scope.disable_add = true;
        dish.amount -=1
        $scope.confirm_dish[dish.confirm_index].amount = dish.amount
        $scope.total -= Number(dish.dish_price)*1
        $timeout(function() {
            $scope.disable_add = false;
        },100)
    };

    //************************
    // confirm order
    //************************


    // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/confirm_order.html', {
            scope: $scope,
            animation: 'slide-in-up'

            }).then(function(confirm) {
                console.log(confirm)
                $scope.confirm = confirm;
              
            });

        $scope.to_checkout = function() {
            var ea_order    = {}
            ea_order.dishes = $scope.confirm_dish;
            ea_order.total  = $scope.total
            OrderService.save_order(ea_order)
            $scope.close_confirm_order()
            setTimeout(function() {
               $location.path("/tab/ordercheckout")
            }, 100);
           
        };   

              // Open the confirm modal
          $scope.open_confirm_order = function() {
            $scope.confirm.show();
          };
             // Open the confirm modal
           $scope.close_confirm_order = function() {
             $scope.confirm.hide();
           };
})//ordermenu ctrl end


