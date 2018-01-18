var $ = (function () {
    'use strict';
    var han = {};
    var _events = [];
    var _repeat = {};//save repeat
    
    han = function (selector) {
        return new han.fn(selector);
    };
    
    //selector
    han.fn = function (selector) {
        if (typeof(selector) != 'string') {
            console.log('not string');
            return;
        }

        if (selector.slice(0,1) === '#') {
        
            return document.getElementById(selector.replace(/#/gi,''));
        } else if (selector.slice(0,1) === '.') {

            if (document.getElementsByClassName) {
                return document.getElementsByClassName(selector.replace(/\./gi,''));
            
            } else {
            
                var list = document.getElementsByTagName('*');
                var classList = [];

                for (var i = 0; i < list.length; i++) {
                    if (list[i].className.match(selector.slice(1))) {
                        classList.push(list[i]);
                    }
                }

                return classList;
            }
        } else {
            return document.getElementsByTagName(selector);
        }
    }
    //ajax function
    han.ajax  = function (params) {
        try {
            var ajaxUrl = params.url;
            var ajaxMethod = params.type;
            var ajaxData = params.data;
            var ajaxCallbackSuc = params.success;
            var ajaxCallbackErr = params.error;
        } catch (e) {
            console.log(e);
        }

        var httpRes;

        if (window.XMLHttpRequest) {
            httpRes = new XMLHttpRequest();
        } else {
            httpRes = new ActiveXObject('Microsoft.XMLHTTP');
        }

        httpRes.open(ajaxMethod, ajaxUrl, true);
        if(params.contentType) {
            httpRes.setRequestHeader("Content-type", params.contentType);
        }
        httpRes.send(ajaxData);

        httpRes.addEventListener('readystatechange', function () {
            if (httpRes.readyState === 4 && httpRes.status === 200) {
                if(params.contentType) {
                    var json = JSON.parse(httpRes.responseText);
                } else {
                    var json = httpRes.responseText;
                }
                ajaxCallbackSuc(json);
            }
            if (httpRes.readyState == 4 && httpRes.status !== 200) {
                ajaxCallbackErr();
            }
        })
    }

    // listener
    han.listener = function (element, events, callback) {
        var ev = document.createEvent('Events');

        ev.initEvent(events, true);
        element.addEventListener(events, callback);
        // 没有做个队列,应该会发生冲突，当监听的事件多了的话
        console.log( han)
        _events.push(ev);
    }
    // controller(important for scope, for i don't have so many time not make it)
    han.controller = function () {

    }
    // front router
    han.include = function (selector, url, callback) {
        var getHtml = function () {
            var hash = location.hash || '#flight';
            var target = hash.replace('#', '');

            han.ajax({
                url: url + target + '.html',
                type: 'GET',
                success: function (res) {
                    han(selector).innerHTML = res;
                    callback();
                },
                error: function (res) {
                    alert('error');
                }
            });
        }
        getHtml();
        window.addEventListener('hashchange', getHtml);
    };
    // use a attribute would be more better
    // reapet as controller not success, use selector to ensure the scope
    han.repeat = function (selector, variable, callback, ifTrue) {
        var dom = han(selector);
        var domSelector;
        var dataRepeat;
        var output　= '';
        var i,
            inner,
            data,
            statics = '';
        if (dom.length) {
                if (dom[0].getAttribute('repeat')) {
                    domSelector = dom[0];
                    dataRepeat = dom[0].getAttribute('repeat');
                }
                for (i = 0; i < dom.length; i++) {
                    if (!dom[i].getAttribute('repeat')) {
                        statics += dom[i].outerHTML;
                    }
                }
        } else {
            if (dom.getAttribute('repeat')) {
                domSelector = dom;
                dataRepeat = dom.getAttribute('repeat');
            }
        }
        
        if (!_repeat[selector]) {
            _repeat[selector] = domSelector.outerHTML;
        }
        inner = _repeat[selector];
        if (!variable.length || variable.length === 0) {
            console.warn('must be a array and length must more than 0');
            if (dom.length) {
                for (var i = 0; i < dom.length; i++) {
                    if (dom[i].className.indexOf('ignore') < 0)
                        dom[i].style.display = 'none';
                }
            } else {
                dom.style.display = 'none';
            }
            if (ifTrue) {
                callback();
            }
            return false;
        }
        for (i = 0; i < variable.length; i += 1) {
            for (data in variable[i]) {
                inner = inner.replace(
                            '{{' + dataRepeat + '.' + data + '}}',
                            variable[i][data]
                        );
            }
            output += inner;
            inner = _repeat[selector];
        }
        domSelector.parentNode.innerHTML =  output + statics;
        if (callback) {
            callback();
        }
    }
    // 双向数据绑定
    // han.duplex = function (obj) {
    //     var all = document.getElementsByTagName('input');
    //     var defineGetSet = function (obj, propName) {
    //               Object.defineProperty(obj, propName, {
    //                 get: function (){
    //                     return obj.value;
    //                 },
    //                 set: function (newValue) {
    //                     // obj.value = newValue;
    //                     console.log(newValue);
    //                 }
    //             })
    //     }
    //     var i;
    //     var objOne = {value: ''};
    //     for (i = 0; i < all.length; i++) {
    //         if (all[i].getAttribute('model') != null) {
    //             console.log(all[i])
    //             for (param in obj) {
    //                 defineGetSet(obj, obj[param], i);
    //             }
    //         } else {
    //             continue;
    //         }
    //     }
    // }
    // pop up
    // return the object
    return han;
})();
// reset alert
function alert(value, callback) {
    jQuery('#alert').modal();
    $('#alert').getElementsByTagName('span')[0].innerHTML = value;
    if (callback) {
        $('.ifShow')[0].style.display = '';
        callback();
    } else {
        console.log('000');
        $('.ifClose')[0].style.display = '';
    }
}
// cookies
function setCookie(name, pass, hours) {
    var url = location.href;
    var time = new Date();
    time.setTime(time.getTime() + hours * 24 * 3600000);
    document.cookie = 'name=' + name +'^pass=' + pass + '^url=' + url + ';expires=' + time.toGMTString();
}
function getCookie(urlIn) {
    var data = document.cookie;
    if (data) {
         var name = data.slice(data.indexOf('name=') + 5, data.indexOf('^pass='));
        var pass = data.slice(data.indexOf('pass=') + 5, data.indexOf('^url='));
        var url = data.slice(data.indexOf('url=') + 4);
        if (url == urlIn) {
            var input = $('.modal-body')[0].getElementsByTagName('input');
            input[0].value = name;
            input[1] .value = pass;
        }
    } 
}