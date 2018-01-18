$(function () {
	$(".login").on('click', function () {
		location.href = 'login'
	})
	$(".register").on('click', function () {
		location.href = 'reg'
	})
	$('#logout').on('click', function () {
		$.ajax({
			url : 'logout',
			type : 'POST',
			success : function (res) {
				location.href = '/'
			},
			error : function (res) {
			}
		})
	})
	$('#myBlog').on('click', function () {
		var _uid = $('#user').text();

		location.href = '/user?' + _uid; 
	})
})