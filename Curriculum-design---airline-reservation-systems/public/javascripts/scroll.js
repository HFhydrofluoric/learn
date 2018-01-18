function initScroll(ifTrue) {
	var scroll = $('#scroll');
	var ul = scroll.getElementsByTagName('ul')[0];
	var li = scroll.getElementsByTagName('li');
	var img = scroll.getElementsByTagName('img');
	var len = li.length;
	width = li[0].offsetWidth;
	for (var j = 0; j < len; j ++) {
		img[j].style.width = width + 'px';
	}
	var count = 0;
	var offset = 0;
	var run = function (speed) {
		scroll.style.marginLeft = '0px';
		var flag = setInterval(function () {
			 offset -= speed;
			 scroll.style.marginLeft = offset + 'px';
			 if (offset <=-1 * width) {
			 	clearInterval(flag);
			 }
		}, 20);
	}
	var start = function () {
		offset = 0;
		tmp = li[0].cloneNode(true);
		ul.appendChild(tmp);
		run(2);
		ul.removeChild(li[0]);
	}
	if (ifTrue) {
		start();
		setInterval(function () {
			start();
		}, 8000);	
	}
}