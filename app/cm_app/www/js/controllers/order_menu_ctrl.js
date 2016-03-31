'use strict';

angular.module('chanmao')
  .controller('OrderMenuCtrl', function($scope, $stateParams,$location,$timeout, $ionicHistory,$ionicLoading, $ionicModal,$ionicScrollDelegate,alertService, RRService,OrderService,$rootScope) {
  // Hide the tab
	  // var tabs = document.querySelectorAll('div.tabs')[0];
	  // tabs = angular.element(tabs);
	  // tabs.css('display', 'none');
   // Trigger the loading indicator

   // Hide the tab
	  // setTimeout(function() {
		// var tabs = document.querySelectorAll('div.tabs')[0];
		// tabs = angular.element(tabs);
		// tabs.css('display', 'none');
	 //  // }, 1000);

	 // //tabs.css('class', 'tabs-item-hide');
	 //   $scope.$on('$destroy', function() {
		//  tabs.css('display', '');
	 //   });
    $scope.show_menu = true;
	  var order_menu_scroll = $ionicScrollDelegate.$getByHandle('order_menu_scroll')
    $scope.$on('$ionicView.leave',function () {
        $ionicHistory.clearHistory()
    })
	  // $scope.showLoading = function() {
	  // $ionicLoading.show({
		 //  template: '<img src="http://cmtest.littlesailing.com/img/chanmao_logo.gif"style="height: 10%;"> </br>快到碗里来...'
	  // });
	  // };
	  // $scope.showLoading()


	 //  $scope.$on('$destroy', function() {
		// // tabs.css('display', '');
		// $scope.modal.remove();

	 //  });

	  $scope.open_dstype = function(dstype) {
		dstype.open = ! dstype.open
		// order_menu_scroll.freezeScroll(true)
		  setTimeout(function() {
			order_menu_scroll.resize()
			// order_menu_scroll.freezeScroll(false)
		  });

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

	 //  $ionicModal.fromTemplateUrl('order-menu-modal.html', function(modal) {
		// $scope.modal = modal;
	 //  }, {
		// // Use our scope for the scope of the modal to keep it simple
		// scope: $scope,
		// // The animation we want to use for the modal entrance
		// animation: 'slide-in-up'
	 //  });

	// $scope.openModal = function() {
	// 	$scope.modal.show();
	// };
	// $scope.closeModal = function() {
	// 	$scope.modal.hide();
	// };

	$scope.dishAdd = function(ds_id,amount,int_no,ds_name,price) {
	  RRService.dishadd($scope,ds_id,amount,int_no,ds_name,price);
	};



	// $scope.$on( "$ionicView.enter", function( scopes, states ) {
			RRService.rrmenu($scope);
		// });
	if ($scope.totaldish == null) $scope.totaldish = 0;

//************************
//scroll
//************************

	var k = 0;
    var interruptedAnimation;
	setTimeout(function() {
		// var scorll_view = $ionicScrollDelegate.$getByHandle('order_menu_scroll').getScrollView()
		// console.log(scorll_view)
		$ionicScrollDelegate.$getByHandle('order_menu_scroll').getScrollView().onScroll = function () {
		  	$scope.menu_scroll()
            // order_menu_scroll_is_complete = $ionicScrollDelegate.$getByHandle('order_menu_scroll').getScrollView().__didDecelerationComplete;
            // console.log('hi',$ionicScrollDelegate.$getByHandle('order_menu_scroll').getScrollView().__interruptedAnimation)


		}
	}, 200);



	$scope.menu_scroll = function(position) {
        // console.log($ionicScrollDelegate.$getByHandle('menu').getScrollView())
        // $scope.$evalAsync(function() {
              $scope.position_top = $ionicScrollDelegate.$getByHandle('order_menu_scroll').getScrollPosition().top
            // });

        if(!!position){
            $scope.position_top = position;
            console.log('position',position)
        }
        // $timeout(function() {
            var cur_cat_id = _.findLastIndex($scope.cate, function(cate) {
               return $scope.position_top >(cate.menu_position-20)
            });
            if(cur_cat_id == -1){
                cur_cat_id = 0
            }
            // console.log('$scope.position_top',$scope.position_top,cur_cat_id)

            if (cur_cat_id !== k) {
                var anchor = "anchor_nav" + cur_cat_id
                var nav_position    = getOffset(document.getElementById(anchor)).left-55;
                // console.log(getOffset(document.getElementById(anchor)).left)
                var nav_width       = document.getElementById(anchor).offsetWidth

                // var nav_btn = document.getElementById("nav_btn");
                // nav_btn.style.width = nav_width + 3+'px';
                // console.log(nav_position)
                // nav_btn.style.transform  = 'translate3d(' + nav_position +'px, 0px, 0px) scale(1)';
                // setTimeout(function() {
                setTimeout(function() {
                        TweenMax.staggerTo(".nav_btn", 0.5, {left: nav_position+ 18+'px',width:nav_width + 3+'px'}, 0.1);
                },100);

                // }, 1000);
                // console.log(nav_position)
                // console.log($ionicScrollDelegate.$getByHandle('Nav').getScrollView())
                var touch_left = $ionicScrollDelegate.$getByHandle('Nav').getScrollView().__initialTouchLeft;
                var touch_right = touch_left + $scope.divice_width
                // console.log(touch_left,touch_right )
                if (touch_left< nav_position && nav_position<touch_right) {

                }else if(cur_cat_id >k){
                    setTimeout(function() {
                        $ionicScrollDelegate.$getByHandle('Nav').scrollTo(nav_position-$scope.divice_width*0.5, 0, true)
                    },100)
                }else if(cur_cat_id < k ){
                    setTimeout(function() {
                        $ionicScrollDelegate.$getByHandle('Nav').scrollTo(nav_position, 0, true)
                    },100)
                }


                var nav = document.getElementById(anchor);
                nav.style.color = '#f8a226'

                var nav_old = document.getElementById('anchor_nav' + k);
                nav_old.style.color =  '#444';

                k = cur_cat_id;
            };
        // },100)
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
			$ionicScrollDelegate.$getByHandle('order_menu_scroll').scrollTo(0, menu_position-18, true)
			$scope.menu_scroll(menu_position)
		}
	};

//************************
// dish
//******************interruptedAnimation******
	$scope.confirm_dish = []
    var interruptedAnimationCount = 0;
	$scope.add_dish = function(dish) {
        if(!$scope.disable_add ){
      			dish.amount += 1
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
				// console.log(confirm)
				$scope.confirm = confirm;

			});

		$scope.to_checkout = function() {
			var ea_order    = {}
			ea_order.dishes = $scope.confirm_dish;
			ea_order.total  = $scope.total
			OrderService.save_order(ea_order)
			$scope.close_confirm_order()
			setTimeout(function() {
			   $location.path("/tab/order/ordercheckout")
			}, 100);

		};

			  // Open the confirm modal
		  $scope.open_confirm_order = function() {
            if($scope.total>30){
                $scope.confirm.show();
            }else{
                alertService.confirm('不满$30只能自取哟','(//o\\\\)','我要自取','再点一点啦')
                    .then(function(result) {
                        var btn_index = result
                        if(btn_index == 1){
                            $scope.confirm.show();
                        }else if (btn_index == 2){
                            return
                        }
                    })
            }

		  };
			 // Open the confirm modal
		   $scope.close_confirm_order = function() {
			 $scope.confirm.hide();
		   };


    //************************
    //search
    //************************
    var in_search = false;
    $scope.search = function() {
        if(!in_search){
            var nav_scroller = angular.element(document.getElementsByClassName("nav-scroller"));
            nav_scroller.removeClass("animated slideInUp")
            nav_scroller.addClass("animated slideOutDown");

            var search_bar = angular.element(document.getElementsByClassName("search_bar"));
            search_bar.removeClass("animated slideOutDown");
            search_bar.addClass("animated slideInUp");
            in_search = true;
        }else{
            var nav_scroller = angular.element(document.getElementsByClassName("nav-scroller"));
            nav_scroller.removeClass("animated slideOutDown")
            nav_scroller.addClass("animated slideInUp");

            var search_bar = angular.element(document.getElementsByClassName("search_bar"));
            search_bar.removeClass("animated slideInUp");
            search_bar.addClass("animated  slideOutDown");
            in_search = false;
            if($scope.search_dish){
                $scope.search_dish.ds_name = "";
            }

        }

    };
    $scope.do_search = function() {
        console.log(here)
        order_menu_scroll.resize()
    };
})
