var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var crypto = require('crypto');//加密
var session = require('express-session');//session使用
var MongoStore = require('connect-mongo')(session);//mongodb使用

var user = require('../model/user');
var blog = require('../model/blogs');

mongoose.connect('mongodb://127.0.0.1/blog');

//提供session支持（与教程中的区别）
router.use(session({
  secret : "test"
}));
// 视图交互：实现用户不同登陆状态下显示不同的页面及显示登陆注册等时的成功和错误等提示信息
router.use(function (req, res, next){
    //res.locals.xxx实现xxx变量全局化，在其他页面直接访问变量名即可
    //访问session数据：用户信息
    res.locals.user = req.session.user;
    res.locals.id = req.session.id;
    next();//控制权转移，继续执行下一个use()
});

// router.all('*', function (req, res, next) {
// 	if( res.locals.user) {
// 	} else {
// 		res.redirect('/login');
// 	}
// 	next()
// })
// /* GET home page. */
router.get('/', function ( req, res) {
 	blog.find({}, function (err, doc) {
	 	if(doc) {
	 		res.render('index', {
		 		title : "博客",
		 		blogs : doc
		 	})
	 	} else {
	 		res.render('index', {
		 		title : "博客",
		 		blogs : []
		 	})
	 	}
 	}).sort({'meta.updateTime' : -1});
  });
/*login*/ 
router.get('/login', function (req, res) {
	res.render('login', {title : '登录'})
})
router.post('/login', function (req, res) {
	var md5 = crypto.createHash('md5'); 
	var name = req.body.name,
	      password = md5.update(req.body.password).digest('base64');

      user.findOne({name : name}, function (err, doc) {
	if(doc) {
		if(doc.password == password) {
             		req.session.user = name;
             		req.session.id = doc.id;
			res.send({
				status : '0',
				msg : 'OK'
			});
		} else {
			res.send({
				status : '1',//password wrong
				msg : 'password错误'
			})
		}
	} else {
		res.send({
			status : '2',//password wrong
			msg : '用户名错误'
		})
	}
})
})
/*register*/ 
router.get('/reg', function (req, res) {
	res.render('reg', {title : '注册'})
})
router.post('/reg', function (req, res, next) {
	var md5 = crypto.createHash('md5');
	var name = req.body.name,
	      password = md5.update(req.body.password).digest('base64');
	
	user.findOne({name : name}, function (err, doc) {
		if(doc) {
			console.log('此用户名已被注册');
			res.send('此用户名已被注册');
		} else {
			user.create({
				'name' : name,
				'password' : password
			});
			res.send(200);
		}
	})
})
/*add message*/ 
router.get('/addMsg', function (req, res) {
	res.render('addMsg', {title : "addMsg"})
})
router.post('/addMsg', function (req, res) {
	var title = req.body.title,
	       message = req.body.message,
	       doctor = res.locals.user;

	blog.create({
		'title' : title,
		'message' : message,
		'doctor' : doctor
	})
	res.send(200);
})

/*logout*/
router.post('/logout', function (req, res) {
	 delete req.session.user;
	res.send(200);
})

/*user*/
router.get('/user', function (req, res) {
	blog.find({doctor : res.locals.user}, function (err, doc) {
		res.render('user',  {
			title : '博客',
			myBlogs : doc
		})
	}).sort({'meta.updateTime' : -1});

}) 

/*user delete*/
router.post('/deleteBlog', function (req, res) {
	var _id = req.body.id;
	blog.remove({'_id' : _id}, function (err, doc) {
	console.log(_id)
		res.send(200)
	})
}) 
/*user update*/
router.get('/update', function (req, res) {
	var id = 'ObjectId(' + req.query.id + ')';

	blog.findOne({'_id' : id}, function (err, doc) {
		console.log(doc)
		res.render('update',{
			'title' : 'update',
			'blogTitle' : 'aa',
			'message' : 'message'
		})
	})
}) 
module.exports = router;

