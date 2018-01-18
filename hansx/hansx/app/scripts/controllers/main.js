'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appApp
 */
// header & footer
hansx.directive('header', function () {
	return {
		restrict : 'AE',
		templateUrl : 'app/views/common/header.html'
	}
})

hansx.directive('footer', function () {
	return {
		restrict : 'AE',
		templateUrl : 'app/views/common/footer.html'
	}
})
// controller
hansx.controller('page', function ($scope, $http) {
	$scope.blogs = [];
	$scope.blogsi = {};

	$http({
		url : '/allBlogs',
		method : 'POST'
	}).then(
		function success (res) {
			if(res.data.status == 1) {
				$scope.blogs = res.data.blogs;
			} else if (res.data.status == 2) {
				$scope.blogs = [{
					content : '暂时没有文章哦',
					time : ''
				}]						
			} else {
				alert('loading failure')
			} 
		},
		function error (res) {
			alert('error');
		}
	)
})

//all blogs
hansx.directive('blogs', ['$http', function ($http) {
	return {
		restrict : 'AE',
		link : function (scope, element) {

			var data = {};

			element.find('a').bind('click', function () {
				var link = this.href.split(/\#/);

				data = {
					classfiy : link[1]
				};

				$http({
					url : '/allBlogs',
					method : 'POST',
					data : data
				}).then(
					function success (res) {
						if(res.data.status == 1) {
					    	 scope.blogs = res.data.blogs;
						} else if (res.data.status == 2) {
							scope.blogs = [{
								content : '暂时没有文章哦',
								time : ''
							}]			
						} else {
							alert('loading failure')
						} 
					},
					function error (res) {
						alert('error');
					}
				)
			})
		}
	}
}])

//查看博客
hansx.directive('viewpage', ['$http', function ($http) {
	return {
		restrict : 'AE',
		link : function (scope) {
			var _id = location.hash.slice(11);
			
			$http({
				url : '/blogs',
				method : 'POST',
				data : {
					_id : _id
				}
			}).then(
				function success (res) {
					scope.blogsi = res.data.blogs;
				},
				function error (res) {
					alert('error')
				}
			)
		}
	}
}])


hansx.filter('htmlslice', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text.slice(0, 100));
    }
});
hansx.filter('html', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    }
});
