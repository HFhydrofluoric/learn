$(function () {
	$('#submit').on('click', function () {
		var title = $('#title').val(),
		       message = $('#message').val();

		$.ajax({
			url : 'addMsg',
			type : 'POST',
			contentType : 'application/json',
			data : JSON.stringify({
				'title' : title,
				'message' : message
			}),
			success : function (res) {
				console.log('success')
				location.href = '/';
			},
			error : function () {
				console.log('failure')
			}
		})
	})
})