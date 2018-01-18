//login data
login.controller('loginCol', ['$scope', '$http', function ($scope, $http) {
	$scope.login = {
		name : "",
		pass : ""
	}
}])
//login http
login.directive('sure', ['$http', function ($http) {
	return {
		restrict : 'AE',
		link : function (scope, element) {
			element.bind('click', function () {
				if(scope.login.name == '' || scope.login.pass == '') {
					alert('can\'t be empty');
					return false;
				}
			
				$http({
					url : '/login',
					method : 'POST',
					data : {
						name : scope.login.name,
						password : scope.login.pass
					}
				}).then(
					function success (res) {
						alert(res.data.value);

						switch(res.data.status) {
							case 1 :
								location.href = '/usr';
								break;
							default : 
								break;
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