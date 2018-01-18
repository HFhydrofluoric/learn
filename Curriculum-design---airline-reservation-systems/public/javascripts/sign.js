jQuery.noConflict();
// 登录注册
$.ajax({
	url: '/signIn',
	type: 'GET',
	contentType: 'application/json',
	success: function (res) {
		if (res.status == 0 && res.value) {
			$('#header').getElementsByTagName('ul')[1].getElementsByTagName('a')[0].innerHTML = res.value;
			$('#header').getElementsByTagName('ul')[0].style.display = 'none';
			$('#header').getElementsByTagName('ul')[1].style.display = 'block';
			user = res.value;
		}
	}
})
// logout
$('#logout').addEventListener('click', function () {
	$.ajax({
		url: '/user/logout',
		type: 'POST',
		contentType: 'application/json',
		success: function (res) {
			alert(res.value);
			location.reload();
		},
		error: function () {
			alert('error');
		}
	})
})
// user
var userAbout = function () {
	$('#user').addEventListener('click', function () {
		$.ajax({
			url: '/userList',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({name: user}),
			success: function (res) {
				$.repeat('.userList', res.value);
			},
			error: function () {
				alert('error');
			}
		})
		$.ajax({
			url: '/userList/moneny',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({name: user}),
			success: function (res) {
				$.repeat('.moneny', res.value);
			},
			error: function () {
				alert('error');
			}
		})
	})
}
userAbout();
function sign(ele, title, arr, cb, other) {
	var inner,
	     i;
	ele.addEventListener('click', function () {
		inner = '';
		$('#myModalLabel').innerHTML = title;
		for (i = 0; i < arr.length; i += 1) {
			inner += '<input type="'+ arr[i].type +'" placeholder="'+ arr[i].placeholder +'" required class="form-control" />';
		}
		if (other) {
			inner += other;
		}
		$('.modal-body')[0].innerHTML = inner;
		if (document.cookie !== '') {
			if ($('.remember')[0]) {
				$('.remember')[0].checked = true;
				getCookie(location.href);
			}	
		}
		$('.submit')[0].onclick = function () {
			cb();
			return false;
		}
	})
}
var signInArr = [
	{
		type: 'text',
		placeholder: '姓名'
	},
	{
		type: 'password',
		placeholder: '密码'
	}
];
// var signOutArr = [
// 	{
// 		type: 'text',
// 		placeholder: '姓名'
// 	},
// 	{
// 		type: 'emal',
// 		placeholder: '邮箱'
// 	},
// 	{
// 		type: 'text',
// 		placeholder: '验证码'
// 	}
// ];
var signOutArr = [
	{
		type: 'text',
		placeholder: '姓名'
	},
	{
		type: 'email',
		placeholder: '邮箱'
	},
	{
		type: 'password',
		placeholder: '密码'
	},
	{
		type: 'password',
		placeholder: '确认密码'
	}
];
var name,
    pass,
    confirm,
    ifRemember,
    email,
    data;
var input;
var checkbox = '<label><input type="checkbox" class="remember" />记住密码?<label> ';
var click = '<a href="#" id="get">获取验证码<a>';
function signIn() {
	input = $('.modal-body')[0].getElementsByTagName('input');
	data = {
		name : input[0].value,
		pass : input[1].value,
	};
	for (var i = 0; i < input.length - 1; i++) {
		if (!input[i].value) {
			alert('不能为空!');
			return false;
		}
	}
	
	if ($('.remember')[0].checked == true) {
		setCookie(data.name, data.pass, 10);
	} else {
		setCookie(data.name, data.pass, 0);
	}
	$.ajax({
		url: '/signIn',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(data),
		success: function (res) {
			alert(res.value);
			if (res.status == 0) {
				$('#header').getElementsByTagName('ul')[0].innerHTML = res.name;
				location.reload();
			}
		},
		error: function () {
			alert('error');
		}
	})
}
function signOut() {
	input = $('.modal-body')[0].getElementsByTagName('input');
	data = {
		name : input[0].value,
		email: input[1].value,
		pass : input[2].value,
		buying: []
	};
	for (var i = 0; i < input.length; i++) {
		if (!input[i].value) {
			alert('不能为空!');
			return false;
		}
	}
	if (data.email.match(/\S{1,}\@\S{1,}\.\S{1,}/) === null) {
		alert('邮箱格式不正确');
		return false;
	}
	if (data.pass !== input[3].value) {
		alert('两次密码不一致');
		return false;
	}
	$.ajax({
		url: '/signOut',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(data),
		success: function (res) {
			alert(res.value);
			if(res.status == 0) {
				location.reload();
			}
		},
		error: function () {
			alert('error');
		}
	})
}
sign($('.signOut')[0], '注册', signOutArr, signOut);
sign($('.signIn')[0], '登录', signInArr, signIn, checkbox);
