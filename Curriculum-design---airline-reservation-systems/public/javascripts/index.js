var user = '';
// all
$.ajax({
	url: '/search',
	type: 'POST',
    contentType: 'application/json',
	data: JSON.stringify({}),
	success: function (res) {
		$.repeat('.flys', res.value, function () {
			$('#list').style.display = 'block';
		});
		if (res.status == 1) {
			alert('dont have flight');
		}	
	},
	error: function () {
		alert('error');
	}
});
// scroll
$.ajax({
	url: '/scroll',
	type: 'GET',
	contentType: 'application/json',
	success: function (res) {
		$.repeat('.scroller', res.value, function () {
			$('#scroll').style.width = 100 * res.value.length + '%';
		});
		if (res.value.length > 1) {
			initScroll(1);
		} else {
			initScroll(0);
		}
	},
	error: function () {
		alert('error');
	}
});
$('.searchBotton')[0].getElementsByTagName('input')[0].addEventListener('click', function () {
	var from = $('#from').value;
	var to = $('#to').value;
	var start = $('.start')[0].value;
	var end  = $('.end')[0].value;
	var choose = $('.choose')[0].getElementsByTagName('input');
	var data;
	if (choose[0].checked == true) {
		data = {
			from: from,
			to: to,
			start: start
		};
	} else {
		data = {
			from: from,
			to: to,
			start: start,
			end: end
		};
	};
	$.ajax({
		url: '/search',
		type: 'POST',
	    contentType: 'application/json',
		data: JSON.stringify(data),
		success: function (res) {
			$.repeat('.flys', res.value, function () {
				$('#list').style.display = 'block';
			});
			if (res.status == 1) {
				alert('dont have flight');
			}
		},
		error: function () {
			alert('error');
		}
	});
});
$('tbody')[0].addEventListener('click', function (event) {
	console.log(event)
	var that = event.srcElement || event.target;
	if (that.className.indexOf('buy') !== -1) {
		var _id = that.parentNode.parentNode.getAttribute('name');
		if (user === '')  {
			$('.signIn')[0].getElementsByTagName('a')[0].click();
			return;
		} else {
			jQuery('#buyModal').modal();

			$('.sureBuy')[0].onclick = function () {
				var input = $('#buyModal').getElementsByTagName('input');
				var passId = input[0].value;
				if (passId == '') {
					alert("can't be empty")
				} else if (passId.length !== 18) {
					alert('身份证号码格式不正确');
				} else {
					$.ajax({
						url: '/buy',
						type: 'POST',
						contentType: 'application/json',
						data: JSON.stringify({
							id: _id,
							passId: passId,
							name: user
						}),
						success: function (res) {
							if (res.status == 0) {
								alert(res.value, function () {
									$('.ifShow')[0].addEventListener('click', function () {
										location.reload();
									})
								})
							} else {
								alert(res.value);
							}
						},
						error: function () {
							alert('error');
						}
					})
				}
			}
		}
		
	} else {
		return;
	}
});
// 退票
$('.v-table')[0].addEventListener('click', function (event) {
	var that = event.srcElement  || event.target;
	if (that.className.indexOf('bounce') !== -1) {
		var _id = that.parentNode.getAttribute('name');
		if (user === '')  {
			$('.signIn')[0].getElementsByTagName('a')[0].click();
			return;
		}
		$.ajax({
			url: '/bounce',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({
				id: _id,
				name: user
			}),
			success: function (res) {
				if (res.status == 0) {
					alert(res.value, function () {
						$('.ifShow')[0].addEventListener('click', function () {
							location.reload();
						})
					})
				} else {
					alert(res.value);
				}
			},
			error: function () {
				alert('error');
			}
		})
	} else {
		return;
	}
})
