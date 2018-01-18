//nav template
hanfeng.directive('nav', function () {
	return {
		restrict : 'AE',
		templateUrl : 'app/views/admin/common/nav.html'
	}
})

//add blogs data
hanfeng.controller('addBlogs', ['$scope', function ($scope, $http) {
	$scope.blogs = {
		title : '',
		content : '',
		classfiy : 'web-fornt'
	}
}])

//add blogs http
hanfeng.directive('submitblogs', ['$http', function ($http) {
	return {
		restrict : 'AE',
		link : function (scope, element) {
			element.bind('click', function () {
				if(scope.blogs.content == '') {
					alert('cant be empty');
					return false;
				}			
				
				$http({
					url : '/addBlogs',
					method : 'POST',
					data : {
						content : scope.blogs.content,
						classfiy : scope.blogs.classfiy
					}
				}).then(
					function success (res) {
						// if(res.data.status == 0) {
							alert(res.data.value)
						// }
					},
					function error (res) {
						alert('error')
					}
				)
			})
		}
	}
}])