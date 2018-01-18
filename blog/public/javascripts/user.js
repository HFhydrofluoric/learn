$(function () {
	$('.delete').on('click', function () {
		var _id = $(this).parent('span').attr('id');

		$.ajax({
			url : 'deleteBlog',
			type : 'POST',
			contentType : 'application/json',
			data : JSON.stringify({
				id : _id
			}),
			success : function (res) {
				location.reload();
			},
			error : function (res) {

			}
		})
	})
	$('.change').on('click', function () {
		var _id = $(this).parent('span').attr('id');
		
		$.ajax({
			url : 'update',
			type : 'GET',
			data : {
				id : _id
			},
			success : function (res) {
			},
			error : function (res) {

			}
		})
	})
})