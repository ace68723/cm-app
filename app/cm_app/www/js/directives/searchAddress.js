angular.module("chanmao")
.directive('searchAddress', function($log,$http) {
	return {
        	restrict: 'AE',
        	scope:{
        	   value: '=ngModel'
          },
          // template:"<input type='text'"+
          //           "style='margin-left: 30px;'"+
          //           "placeholder='请输入地址'"+
          //           "ng-model='value'"+
          //           "ng-change='onChange()'>",
          template:`<input type='text'
                    style='margin-left: 30px;'
                    placeholder='请输入地址'
                    ng-model='value'
                    ng-change='onChange()'>`,

          link: function($scope, element, attrs) {
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
                      console.log($scope.predictions)
                    }, function errorCallback(response) {
                      // called asynchronously if an error occurs
                      // or server returns response with an error status.
                  });
               }

          }
      }
});
