var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var admin    = require('../model/admin');
var flight   = require('../model/flights');
var image    = require('../model/images');
var fuser    = require('../model/fuser');
var buy      = require('../model/buy');
var crypto   = require('crypto');
var session  = require('express-session');//session使用
var multiparty = require('multiparty');
var fs = require('fs');

mongoose.connect('mongodb://127.0.0.1/airline');

//use session
router.use(session({
    secret: "airline"
}));

router.use(function (req, res, next) {
    'use strict';
    res.locals.admin = req.session.admin;
    res.locals.user = req.session.user;
    next();//控制权转移，继续执行下一个use()
});
// need check
router.get('/admin', function (req, res, next) {
    'use strict';
    if (res.locals.admin) {
        res.render('admin/index');
    } else {
        res.render('admin/login');
    }
});
router.get('/loginAdmin', function (req, res) {
    res.send({
        status: 0,
        value: res.locals.admin
    })
})

/* GET home page. */
router.get('/', function (req, res, next) {
    'use strict';
    res.render('index');
});

router.post('/login', function (req, res) {
    'use strict';
    if (res.locals.id && res.locals.admin) {
        res.render('admin/index');
    }
    var name = req.body.name,
          pass = req.body.pass;
    try {
        admin.findOne({name: name}, function (err, doc) {
            if (err) {
                res.send({
                    status: 3,
                    value: err
                });
            } else if (doc) {
                if (doc.pass !== pass) {
                    res.send({
                        status: 2,
                        value: '密码错误'
                    });
                } else {
                    req.session.admin = doc.name;
                    res.send({
                        status: 0,
                        value: '成功登录'
                    });
                }
            } else {
                res.send({
                    status: 1,
                    value: '用户不存在'
                });
            }
        });
    } catch (e) {
        console.log(e);
    }
});
router.post('/admin/logOut', function (req, res) {
    delete req.session.admin;
    res.send({
        status: 0,
        value: 'success'
    });
})
// flight manage
router.get('/flights', function (req, res) {
    var num = req.query.page;
    flight.find({}, function (err, doc) {
        res.send({
            status: 0,
            value: doc.length > 6 ? doc.slice(num * 6, (num + 1) * 6) : doc,
            page: Math.ceil(doc.length / 6)
        })
    });
})
router.post('/flights/update', function (req, res) {
    var data = {
        fid: 0,
        fly: '',
        from: '',
        to: '',
        date: '',
        time: '',
        amount: '',
        last: '',
        moneny: ''
    }
    for (e in data) {
        data[e] = req.body[e];
    }
    flight.update({_id : req.body.id}, data, function () {
        res.send({
            status: 0,
            value: 'success'
        })
    })
})
router.post('/flights/add', function (req, res) {
    flight.create(req.body, function (err) {
        res.send({
            status: 0,
            value: 'success'
        })
    });
})
router.post('/flights/delete', function (req, res) {
    flight.remove({'_id': req.body._id}, function (err, doc) {
        buy.remove({flyId: req.body._id}, function (err, doc) {
            res.send({
                status: 0,
                value: 'success'
            })
        })
    })
})
// images
router.post('/uploadImg', function (req, res) {
     var form = new multiparty.Form();
     form.parse(req, function (err, descs, files) {
         fs.readFile(files.file[0].path, function (err, data) {
            fs.writeFile('./public/images/upload/'+ files.file[0].originalFilename, data, function (err) {
                if (err) {
                    res.send({
                        status: 1,
                        value: 'error'
                    })
                } else {
                     image.create({
                        name: files.file[0].originalFilename,
                        desc: descs.desc[0]
                     });
                     res.send({
                        status: 0,
                        value: 'success'
                    })
                }
             })
         })
     })
})
// images get
router.get('/downloadImg', function (req, res) {
        var i;
        var arr = [];
        image.find({}, function (err, doc) {
        for (i = 0; i < doc.length; i += 1) {
            arr.push({'src': '../../images/upload/' + doc[i].name, desc: doc[i].desc}); 
        }
       res.send({
            status: 0,
            value: arr
       });
    })
})
// image del
router.post('/delImg', function (req, res) {
    fs.unlink('./public/images/upload/' + req.body.name, function () {
        image.remove({name: req.body.name}, function (err, doc) {
            res.send({
                status: 0,
                value: 'success'
            });
        });
    });
})
// business
router.get('/business', function (req, res) {
    var num = req.query.page;
    var list1 = [],
        list2 = [],
        list = [];
    var tmplist;
    var tmp;
    buy.find({}, function (err, doc) {
        if (err) {
            res.send({
                status: 1,
                value: 'error'
            })
        } else if (doc == null || doc.length == 0) {
            res.send({
                status: 2,
                value: [],
                page: 1
            })
        } else { 
            var len = doc.length;
                tmp = doc;
            for(var i = 0; i < len; i++) {
               (function (i) {
                    fuser.findOne({_id: tmp[i].userId}, function (err, doc) {
                        if (err) {
                            res.send({
                                status: 1,
                                value: 'error'
                            })
                        } else {
                            list1.push(doc);
                            flight.findOne({_id: tmp[i].flyId}, function (err, doc) {
                                if (err) {
                                    res.send({
                                        status: 1,
                                        value: 'error'
                                    })
                                } else if (doc.length !== 0 || doc !== null) {
                                    list2.push(doc);
                                    if (list2.length == len) {
                                        for (var i = 0; i < len; i++) {
                                            list[i] = {
                                                name: list1[i].name,
                                                email: list1[i].email,
                                                moneny: list2[i].moneny,
                                                date: list2[i].date,
                                                fly: list2[i].fly
                                            }
                                        }
                                        res.send({
                                            status: 0,
                                            value: list.length > 10 ? list.slice(num * 10, (num + 1) * 10) : list,
                                            page: Math.ceil(list.length / 10)
                                        })
                                    }
                                }
                            })
                        } 
                    })
               })(i)
            } 
        }
    })
})

// 用户注册
router.post('/signOut', function (req, res) {
    fuser.findOne({name: req.body.name}, function (err, doc) {
        if (err) {
            res.send({
                status: 1,
                value: 'error'
            })
        } else if (doc != null) {
            res.send({
                status: 2,
                value: '用户名已经存在'
            })
        } else {
            var data = {
                name: '',
                pass: '',
                email: '',
                moneny: 0,
                order: 0
            };
           for (ev in req.body) {
                data[ev] = req.body[ev];
           }
            fuser.create(data, function (err) {
                res.send({
                    status: 0,
                    value: 'success'
                })
            });
        }
    })
})
// 用户登录
router.post('/signIn', function (req, res) {
    fuser.findOne({name: req.body.name}, function (err, doc) {
        if (err) {
            res.send({
                status: 1,
                value: err
            })
        } else if (doc != null && doc.pass == req.body.pass) {
            req.session.user = req.body.name;
            res.send({
                status: 0,
                value: 'success',
                name: req.body.name
            })
        } else if (doc == null) {
            res.send({
                status: 2,
                value: '用户不存在'
            })
        } else {
            res.send({
                status: 3,
                value: 'pass error'
            })
        }
    })
});
router.post('/user/logout', function (req, res) {
    delete req.session.user;
    res.send({
        status: 0,
        value: 'success'
    })
})
router.get('/userManage', function (req, res) {
    var num = req.query.page;
    fuser.find({}, function (err, doc) {
        if (err) {
            res.send({
                status: 1,
                value: err
            })
        } else {
            res.send({
                status: 0,
                value: doc.length > 6 ? doc.slice(num * 6, (num + 1) * 6) : doc,
                page: Math.ceil(doc.length / 6)
            })
        }
    })
})
// search//mei zuo shaixuan
router.post('/search', function (req, res) {
    var select = {};
    if (req.body.from) {
        select = {
            from: req.body.from, 
            to: req.body.to,
            date: req.body.start
        };
    }
    flight.find(select, function (err, doc) {
       if (doc.length == 0) {
            res.send({
                status: 1,
                value: doc
            })
       } else {
            res.send({
                status: 0,
                value: doc
            })
       }
    });
});
// scroller get
router.get('/scroll', function (req, res) {
        var i;
        var arr = [];
        image.find({}, function (err, doc) {
        for (i = 0; i < doc.length; i += 1) {
            arr.push({'src': '../../images/upload/' + doc[i].name, desc: doc[i].desc}); 
        }
       res.send({
            status: 0,
            value: arr
       });
    })
})
router.get('/signIn', function (req, res) {
     res.send({
        status: 0,
        value: res.locals.user
     });
});
// buy tickets
router.post('/buy', function (req, res) {
    flight.findOne({_id: req.body.id}, function (err, doc) {
        var name = req.body.name;
        var userId;
        var newLast = doc.last - 1;
        var newAmount = doc.amount + 1;
        var flyDoc = doc;
        var flyErr = err;
        var moneny;
        var tmp;
        fuser.findOne({name: name}, function (err, doc) {
            tmp = doc;
            if (err) {
                res.send({
                    status: 1,
                    value: 'error'
                })
            } else { 
                userId = doc._id;
                buy.findOne({userId: userId, flyId: req.body.id}, function (err, doc) {
                    if (err) {
                        res.send({
                            status: 1,
                            value: 'error'
                        })
                    } else if (doc == null) {
                        tmp.moneny -= flyDoc.moneny;
                        if (tmp.moneny < 0) {
                            res.send({
                                status: 2,
                                value: '请充值'
                            })
                        } else if (newLast < 0) {
                            res.send({
                                status: 2,
                                value: '没有余票'
                            })
                        } else {
                            tmp.order += 1;
                            fuser.update({name: name}, tmp, function (err) {
                                if (flyErr) {
                                    res.send({
                                        status: 1,
                                        value: 'error'
                                    })
                                } else if (flyDoc) {
                                    buy.create({userId: userId, flyId: req.body.id, passId: req.body.passId, sitId: flyDoc.amount + 1});
                                    flyDoc.last = newLast;
                                    flyDoc.amount = newAmount;
                                    flight.update({_id: req.body.id}, flyDoc, function (err) {
                                        res.send({
                                            status: 0,
                                            value: 'success'
                                        })
                                    });
                                }
                            }); 
                           
                        }
                    } else {
                        res.send({
                            status: 2,
                            value: '已经购买此航班，无法重复购买'
                        })
                    }
                })
                
            }
        })
    })
})
// 退票
router.post('/bounce', function (req, res) {
    flight.findOne({_id: req.body.id}, function (err, doc) {
        var name = req.body.name;
        var userId;
        var newLast = doc.last + 1;
        var newAmount = doc.amount - 1;
        var flyDoc = doc;
        var flyErr = err;
        var moneny;
        fuser.findOne({name: name}, function (err, doc) {
            if (err) {
                res.send({
                    status: 1,
                    value: 'error'
                })
            } else { 
                userId = doc._id;
                doc.moneny += flyDoc.moneny;
                doc.order -= 1;
                fuser.update({name: name}, doc, function (err) {
                    if (flyErr) {
                        res.send({
                            status: 1,
                            value: 'error'
                        })
                    } else if (flyDoc) {
                        buy.remove({userId: userId, flyId: req.body.id}, function (err) {
                            if (err) {
                                res.send({
                                    status: 1,
                                    value: 'error'
                                })
                            } else {
                                flyDoc.last = newLast;
                                flyDoc.amount = newAmount;
                                flight.update({_id: req.body.id}, flyDoc, function (err) {
                                    res.send({
                                        status: 0,
                                        value: 'success'
                                    })
                                });
                            }
                        });
                    }
                }); 
            }
        })
    })
})
router.post('/userList', function (req, res) {
    var name = req.body.name;
    var _id;
    var list = [];
    fuser.findOne({name: name}, function (err, doc) {
        if (err) {
            res.send({
                status: 1,
                value: 'error'
            })
        } else if (doc) {
            _id = doc._id;
            buy.find({userId: _id}, function (err, doc) {
                if (err) {
                    res.send({
                        status: 1,
                        value: 'error'
                    })
                } else if (doc.length !== 0) {
                    var len = doc.length;
                    var i = 0;
                    for (; i < len; i++) {
                         (function (i) {
                            flight.findOne({_id: doc[i].flyId}, function (err, doc) {
                                list.push(doc);
                                if (list.length === len) {
                                     res.send({
                                        status: 0,
                                        value: list
                                    })
                                }
                            })
                       })(i)
                   }
                } else {
                    res.send({
                        status: 2,
                        value: []
                    })
                }
            })
        }
    })
})
router.post('/userList/moneny', function (req, res) {
    fuser.findOne({name: req.body.name}, function (err, doc) {
        if (err) {
            res.send({
                status: 1,
                value: []
            })
        } else {
            var tmp = [];
            
            tmp.push(doc);
            res.send({
                status: 0,
                value: tmp
            })
        }
    })
})
// update user
router.post('/update/user', function (req, res) {
    fuser.findOne({_id: req.body.id}, function (err, doc) {
        if (err) {
            res.send({
                status: 1,
                value: 'error'
            })
        } else if (doc !== null || doc.length !== 0) {
            doc.moneny = req.body.moneny;
            fuser.update({_id: req.body.id}, doc, function () {
                 res.send({
                    status: 0,
                    value: 'success'
                })
            });
        } else {
            res.send({
                status: 1,
                value: 'error'
            })
        }
    })
})
// delete user
router.post('/delete/user', function (req, res) {
    fuser.remove({_id: req.body.id}, function (err) {
       if (err) {
            res.send({
                status: 1,
                value: 'error'
            })
       } else {
             buy.remove({userId: req.body.id}, function (err) {
                if (err) {
                    res.send({
                        status: 1,
                        value: 'error'
                    })
                } else {
                    res.send({
                        status: 0,
                        value: 'success'
                    })
                }
            })
       }
    })
})
// 404
router.get('/404', function (req, res) {
    res.render('error');
})
// 404
router.get('*',  function (req, res) {
    res.redirect('/404');  
})
module.exports = router;
