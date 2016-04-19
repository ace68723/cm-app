'use strict';

/**
 * @ngdoc service
 * @name helloIonicApp.loadingService
 * @description
 * # loadingService
 * Factory in the helloIonicApp.
 */
angular.module('chanmao')
  .factory('scrollService', ['$injector',function ($injector) {
    var scrollService = {}
    scrollService.scroll_refresh = function(Handle) {
        var $ionicScrollDelegate = $injector.get('$ionicScrollDelegate')
        var scrollView = $ionicScrollDelegate.$getByHandle(Handle).getScrollView()
            scrollView.__publish(
                scrollView.__scrollLeft, - scrollView.__refreshHeight,
                scrollView.__zoomLevel, true);

            var d = new Date();

            scrollView.refreshStartTime = d.getTime();

            scrollView.__refreshActive = true;
            scrollView.__refreshHidden = false;
            if (scrollView.__refreshShow) {
                scrollView.__refreshShow();
            }
            if (scrollView.__refreshActivate) {
                scrollView.__refreshActivate();
            }
            if (scrollView.__refreshStart) {
                scrollView.__refreshStart();
            }
    }
    return scrollService
  }]);
