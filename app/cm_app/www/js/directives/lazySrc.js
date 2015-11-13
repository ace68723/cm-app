'use strict';

/**
 * @ngdoc directive
 * @name cmAppApp.directive:logo
 * @description
 * # logo
 if ( (end.getTime()-start.getTime()) > 10000) {
    alert('gave up')
  }
 */
angular.module('chanmao')
  .directive('lazyScript', function($q,$interval) {

  	  	var importScript = (function (oHead) {
			return function (sSrc, fOnload) {
  		    	var deferred = $q.defer();
  		    	var end = new Date();
  		    	

				var oScript = document.createElement("script");
				oScript.type = "text\/javascript";
				if (fOnload) { oScript.onload = fOnload; }
				// console.log(oScript)
				oHead.appendChild(oScript);
				oScript.src = sSrc;
				
				oScript.onload = function() {
					deferred.resolve("done")
				};
				oScript.onerror = function(oError) {
					deferred.reject("load error")
					throw new URIError("The script " + oError.target.src + " is not accessible.");
				}
				
				return deferred.promise;
  		    }
  		    

  	  	})(document.head || document.getElementsByTagName("head")[0]);
  	
  	return {
	    restrict: 'AE',
	    scope: {
	      src: '@'
	    },
	    compile: function(tElement, tAttr) {
		    return function(scope, element) {
		    	var times = 0;
		      	var stop = $interval(function(){
			      	importScript(scope.src)
			      	.then(function(result) {
			      		$interval.cancel(stop);
			      	})
			      	.catch(function(error) {
			      		console.log(error)
			      	})

			    },1000)
			}
  		}
  	}
  	
})  
