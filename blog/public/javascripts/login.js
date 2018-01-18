$(function () {
	$('#submit').on('click', function () {
		var name = $('#name').val(),
		       password = $('#password').val();
		
		$.ajax({
			url : 'login',
			type : 'POST',
			contentType : 'application/json',
			data : JSON.stringify({
				'name' : name,
				'password' : password
			}),
			success : function (res) {
				if(res.status != 0) {
					alert(res.msg);
				} else {
					location.href = '/';
				}
			},
			error : function () {
				alert('reg failure');
			}
		})
	})
})