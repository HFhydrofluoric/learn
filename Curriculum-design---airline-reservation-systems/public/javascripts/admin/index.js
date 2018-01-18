// admin name
$.ajax({
    url: '/loginAdmin',
    type: 'GET',
    success: function (res) {
        var admin = {
            name: ''
        }
        var arr = [];
        admin.name = JSON.parse(res).value;
        arr.push(admin);
        $.repeat('#admin', arr);
    }
})
// login out
$('#logOut').addEventListener('click', function () {
    $.ajax({
        url: '/admin/logOut',
        type: 'POST',
        contentType: 'application/json',
        success: function (res) {
            if (res.status == 0) {
                alert(res.value, function () {
                    $('.ifShow')[0].onclick = function () {
                        location.reload();
                    }
                })
            } else {
                alert(res.value);
            }
        },
        error: function () {
            alert('error');
        }
    })
})
$.include('#src', '../html/page/', function () {
    'use strict';
     if ($('.city-box')[0]) {
        $('.city-box')[0].style.display = 'none';
     }
    // left
    $('#nav').childNodes[1].addEventListener('click', function (e) {
        if($('.living')[0]) {
            $('.living')[0].className = '';
        }
        e.srcElement.setAttribute('class', 'living');
    })
    // flight
    var i;
    var about;
    var aFlys;
    var aboutFlys;
    var flightsOld = {
        fid: 0,
        fly: '',
        from: '',
        to: '',
        date: '',
        time: '',
        amount: '',
        last: '',
        moneny: '',
        id: ''
    };
    var flight = {
        fid: 0,
        fly: '',
        from: '',
        to: '',
        date: '',
        time: '',
        amount: '',
        last: '',
        moneny: '',
        id: ''
    };
    var callback = function () {
        switch (this.className.split(' ')[1]) {
        case 'change':
            this.parentNode.style.display = 'none';
            showNode = this.parentNode.nextElementSibling;
            showNode.className = '';

            aFlys = this.parentNode.parentNode;
            aboutFlys = aFlys.getElementsByTagName('input');
           
            count = 0;
            for (about in flightsOld) {
                flightsOld[about] = aboutFlys[count].value;
                aboutFlys[count].removeAttribute('readonly');
                count += 1;
            }
            break;
        case 'ifSure':
            var that  = this;
            aFlys = this.parentNode.parentNode;
            aboutFlys = aFlys.getElementsByTagName('input');

            count = 0;
            for(about in flight) {
                flight[about] = aboutFlys[count].value;
                count += 1;                 
            }
           flight.id = aFlys.getAttribute('name');
            $.ajax({
                url: '/flights/update',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(flight),
                success: function (res) {
                    // if (res.status !== 0) {
                    //     for (about in flight) {
                    //         flight[about] = flightsOld[about];
                    //     }
                    // }
                    that.parentNode.className = 'hidden';
                    aboutFlys[aboutFlys.length - 3].parentNode.previousElementSibling.style = '';
                    count = 0;
                    for (about in flightsOld) {
                        aboutFlys[count].setAttribute('readonly',true);
                        count += 1;
                    }
                    if (res.status == 0) {
                        alert(res.value, function () {
                            $('.ifShow')[0].onclick = function () {
                                location.reload();
                            }
                        })
                    } else {
                        alert(res.value);
                    }

                },
                error: function () {
                    alert('error');
                    count = 0;
                    for (about in flightsOld) {
                        aboutFlys[count].value =  flightsOld[about];
                        count += 1;
                    }
                }
            });
            break;
        case 'cancle':
            hiddenNode = this.parentNode;
            hiddenNode.className = 'hidden';
            hiddenNode.previousElementSibling
                .style.display = 'block';
            count = 0;
            for (about in flightsOld) {
                aboutFlys[count].value =  flightsOld[about];
                aboutFlys[count].setAttribute('readonly',true);
                count += 1;
            }
            break;
        case 'delete': 
            var id = this.parentNode.parentNode.getAttribute('name');
            $.ajax({
                url: '/flights/delete',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    _id: id
                }),
                success: function(res) {
                    if (res.status == 0) {
                        alert(res.value, function () {
                            $('.ifShow')[0].onclick = function () {
                                location.reload();
                            }
                        })
                    } else {
                        alert(res.value);
                    }
                },
                error: function(){
                    alert('error');
                }
            })
        default:
            break;
        }
    };
    var showNode;
    var flights;
    var count;
    var hiddenNode;
    var loadData = function () {
        flights = [];
        
        $.ajax({
            url: '/flights?page=0',
            type: 'GET',
            contentType: 'applaction/json',
            success: function (res) {
                flights = res.value;
                setPage('/flights', '.flys', res.page, function () {
                    for (i = 0; i < $('.change').length; i += 1) {
                            $('.change')[i].addEventListener('click', callback);
                            $('.ifSure')[i].addEventListener('click', callback);
                            $('.cancle')[i].addEventListener('click', callback);
                            $('.delete')[i].addEventListener('click', callback);
                        }
                });
                var fly = $('.flys');
                try {
                    $.repeat('.flys', flights, function () {
                         // date
                        jQuery('input[name="daterange"]').daterangepicker({
                            singleDatePicker: true,
                            locale: {
                              format: 'YYYY-MM-DD'
                            }
                        });
                        // city
                        LazyLoad.css(["../plugins/city/city.css"], function () {
                            LazyLoad.js(["../plugins/city/city.js"], function () {
                                var fr = new citySelector.cityInit("from");
                                var to = new citySelector.cityInit("to");
                            });
                        });
                         for (i = 0; i < $('.change').length; i += 1) {
                            $('.change')[i].addEventListener('click', callback);
                            $('.ifSure')[i].addEventListener('click', callback);
                            $('.cancle')[i].addEventListener('click', callback);
                            $('.delete')[i].addEventListener('click', callback);
                        }
                        fly[fly.length - 1].getElementsByTagName('input')[0].value = flights.length + 1; 
                    },1);
                   
                } catch (e) {
                    console.log(e);
                }
                try{
                $('.add')[0].addEventListener('click', function () {
                    var newFlight = {
                        fid: 0,
                        fly: '',
                        from: '',
                        to: '',
                        date: '',
                        time: '',
                        last: '',
                        moneny: '',
                        amount: ''
                    };
                    aFlys = this.parentNode.parentNode;
                    aboutFlys = aFlys.getElementsByTagName('input');

                    count = 0;
                    for(about in newFlight) {
                        newFlight[about] = aboutFlys[count].value;
                        if (!aboutFlys[count].value) {
                            alert("cant't be empty!");  
                            return;
                        }           
                        count += 1;      
                    }
                    newFlight.amount = 0;
                    $.ajax({
                        url: '/flights/add',
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify(newFlight),
                        success: function (res) {
                            if (res.status == 0) {
                                alert(res.value, function () {
                                    $('.ifShow')[0].onclick = function () {
                                        location.reload();
                                    }
                                })
                            } else {
                                alert(res.value);
                            }
                        },
                        error: function () {
                            alert('error');
                        }
                    });
                })
                } catch (e) {}
            }
        })
    }
    // flight
    if (location.hash.indexOf('flight') == 1 || location.hash == '') {
        loadData();
    }
    // scroller
    if(location.hash.indexOf('scroll') == 1) {
         $.ajax({
             url: '/downloadImg',
             type: 'GET',
             success: function (res) {
                var res = JSON.parse(res);
                $.repeat('.scrollRepeat', res.value);
             },
             error: function () {
                 alert('error');
             }
         })
         $('.addImg')[0].addEventListener('click', function (e) {
            e.srcElement.previousElementSibling.click();
            e.srcElement.nextElementSibling.addEventListener('click', function () {
                var desc = $('#desc').value;
                var data = $('.uploadImg')[0].files[0];
                var formdata = new FormData();
                formdata.append('file', data);
                formdata.append('desc', desc);
                $.ajax({
                    url: '/uploadImg',
                    type: 'POST',
                    data: formdata,
                    success: function (res) {
                        var res = JSON.parse(res);
                        if (res.status == 0) {
                            alert(res.value, function () {
                                $('.ifShow')[0].onclick = function () {
                                    location.reload();
                                }
                            })
                        } else {
                            alert(res.value);
                        }
                    },
                    error: function () {
                        alert('error');
                    }
                })
            })
        })
        $('.delete')[0].addEventListener('click', function (e) {
            var img = e.target.getAttribute('src').replace('../../images/upload/', '');
            var sure = confirm('sure to delete?');
            if (sure == true) {
                 $.ajax({
                    url: '/delImg',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        name: img
                    }),
                    success: function (res) {
                        if (res.status == 0) {
                            alert(res.value, function () {
                                $('.ifShow')[0].onclick = function () {
                                    location.reload();
                                }
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
        })
    }
    //会员管理
    if (location.hash.indexOf('userManage') == 1) {
        $.ajax({
            url: '/userManage?page=0',
            type: 'GET',
            contentType: 'application/json',
            success: function (res) {
                setPage('/userManage', '.user', res.page);
                $.repeat('.user', res.value);
            },
            error: function () {
                alert('error');
            } 
        })
        // user管理
        $('tbody')[0].addEventListener('click', function (e) {
            if (e.srcElement.tagName === 'A') {
                var user = e.srcElement.innerHTML;
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
            } else if (e.srcElement.getAttribute('value') === 'sure') {
                var _id = e.srcElement.parentNode.parentNode.getAttribute('name');
                var moneny = e.srcElement.parentNode.parentNode
                .getElementsByTagName('input')[0].value;
                $.ajax({
                    url: '/update/user',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({id: _id, moneny: moneny}),
                    success: function (res) {
                        if (res.status == 0) {
                            alert(res.value, function () {
                                $('.ifShow')[0].onclick = function () {
                                    location.reload();
                                }
                            })
                        } else {
                            alert(res.value);
                        }
                    },
                    error: function () {
                        alert('error');
                    }
                })
            } else if (e.srcElement.getAttribute('value') === 'delete') {
                var _id = e.srcElement.parentNode.parentNode.getAttribute('name');
                $.ajax({
                    url: '/delete/user',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({id: _id}),
                    success: function (res) {
                       if (res.status == 0) {
                            alert(res.value, function () {
                                $('.ifShow')[0].onclick = function () {
                                    location.reload();
                                }
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
        })
    }

    if (location.hash.indexOf('bussiness') == 1) {
        $.ajax({
            url: '/business?page=0',
            type: 'GET',
            success: function (res) {
                res = JSON.parse(res);
                setPage('/business', '.bussiness', res.page);
                $.repeat('.bussiness', res.value);
            },
            error: function () {
                alert('error');
            }
        })
    }
});

