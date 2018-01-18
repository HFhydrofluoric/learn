hansx.config(function ($stateProvider) {
	$stateProvider
		.state('/', {
			url : '',
			views : {
				'indexPage'	 : {templateUrl : 'app/views/page/home.html'}
			}
		})
		.state('web-fornt', {
			url : '/web-fornt',
			views : {
				'indexPage'	 : {templateUrl : 'app/views/page/home.html'}
			}
		})
		.state('linux', {
			url : '/linux',
			views : {
				'indexPage'	 : {templateUrl : 'app/views/page/home.html'}
			}
		})
		.state('c&c++', {
			url : '/c&c++',
			views : {
				'indexPage'	 : {templateUrl : 'app/views/page/home.html'}
			}
		})
		.state('viewPage', {
			url : '/viewPage/:_id',
			views : {
				'indexPage'	 : {templateUrl : 'app/views/page/viewPage.html'}
			}
		})
})