hanfeng.config(function ($stateProvider) {
	$stateProvider
		.state('/', {
			url : '',
			views : {
				'usr' : {templateUrl : 'app/views/admin/page/addBlogs.html'}
			}
		})
		.state('addBlogs', {
			url : '/addBlogs',
			views : {
				'usr' : {templateUrl : 'app/views/admin/page/addBlogs.html'}
			}
		})
		.state('myself', {
			url : '/myself',
			views : {
				'usr' : {templateUrl : 'app/views/admin/page/myself.html'}
			}
		})
		.state('comment', {
			url : '/comment',
			views : {
				'usr' : {templateUrl : 'app/views/admin/page/comment.html'}
			}
		})
		.state('viewBlogs', {
			url : '/viewBlogs',
			views : {
				'usr' : {templateUrl : 'app/views/admin/page/viewBlogs.html'}
			}
		})
		.state('navSet', {
			url : '/navSet',
			views : {
				'usr' : {templateUrl : 'app/views/admin/page/navSet.html'}
			}
		})
})