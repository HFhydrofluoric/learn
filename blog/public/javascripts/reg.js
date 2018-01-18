$(function () {
	$('#submit').on('click', function () {
		var name = $('#name').val(),
		       password = $('#password').val();
		
		$.ajax({
			url : 'reg',
			type : 'POST',
			contentType : 'application/json',
			data : JSON.stringify({
				'name' : name,
				'password' : password
			}),
			success : function (res) {
				alert(res);
			},
			error : function () {
				alert('reg failure');
			}
		})
	})
})