angular.module("chanmao")
.directive('searchAddress', function($log,$http,$state,AddressService) {
	return {
        	restrict: 'AE',
        	scope:{
        	   value: '=ngModel',
						 page:'@'
          },
          template:`
							<label class="item item-input item-icon-left">
								<i class="icon ion-ios-home cm_blue"></i>
										<input type='text'
		                    style='margin-left: 30px;'
		                    placeholder='请输入地址'
		                    ng-model='value'
		                    ng-change='onChange()'>
							  </label>
								<div class="list">
									  <a class="item " ng-repeat="address in predictions"
																		 ng-click="goToAddress(address)">
									    {{address.description}}
									  </a>
										<a class="item item-text-wrap" ng-if="predictions.length == 0">
												<p>	小提示：请直接输入地址，类似 100 Abc St, Toronto, 前面不要加任何Unit信息哦
												</p>
										</a>
								</div>`,

          link: function($scope, element, attrs) {
						  	$scope.predictions = [];
                $scope.onChange = function(){
                  $scope.search()
                };
               $scope.search = function() {
                   var url = "https://maps.googleapis.com/maps/api/place/autocomplete/" +
                  "json?input="+  $scope.value +
                  "&language=en" +
                  "&types=address" +
                  "&key=AIzaSyA-DNIURR8yEk2wbSKYZ_44qzzCNhLWhVA"
                  $http({
                    method: 'GET',
                    url: url
                  }).then(function successCallback(response) {
                      var data = response.data;
                      $scope.predictions = data.predictions;
                    }, function errorCallback(response) {
                  });
               }
							 $scope.goToAddress = function (address) {
							 		AddressService.save_search_result(address)
									if($scope.page == 'profile'){
										$state.go('tab.addradd')
									}else if($scope.page == 'menu'){
										$state.go('tab.add_address')
									}

							 }

          }
      }
});
