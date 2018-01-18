// login
$('#submit').onclick = function () {
    'use strict';
    var name = $('.name')[0].value,
        pass = $('.password')[0].value;

    if (name === '' || pass === '') {
        alert('不能为空');
        return;
    }

    $.ajax({
        url: '/login',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            name: name,
            pass: pass
        }),
        success: function (res) {
            if (res.status === 0) {
                location.href = '/admin';
            } else {
                //pass err || name not exist
                alert(res.value);
            }
        },
        error: function () {
            alert('error');
        }
    });
};
// lister keydown
document.addEventListener('keydown', function (e) {
    'use strict';
    var event = e || window.event;

    if (event.which === 13) {
        $('#submit').onclick();
    } else {
        return;
    }
});