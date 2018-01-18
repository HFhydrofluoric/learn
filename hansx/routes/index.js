var express = require('express');
var mongoose = require('mongoose');
var crypto = require('crypto');
var session = require('express-session');//session使用
var MongoStore = require('connect-mongo')(session);//mongodb使用
//parse markdown
var marked = require('marked');
var router = express.Router();

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: true,
  sanitize: true,
  smartLists: true,
  smartypants: true
});

// connect mongodb
mongoose.connect('mongodb://127.0.0.1/hansx');

//use session
router.use(session({
  secret : "test"
}));

router.use(function (req, res, next){
    //res.locals.xxx实现xxx变量全局化，在其他页面直接访问变量名即可
    //访问session数据：用户信息
    res.locals.user = req.session.user;
    res.locals.id = req.session.id;
    next();//控制权转移，继续执行下一个use()
});

// model
var blogs = require('../model/blogs');
var usrs = require('../model/usr');

//get the page
/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index');
})
// all blogs
router.post('/allBlogs', function (req, res, next) {

  if(req.body.classfiy == '') {
  	var data = {}
  } else {
  	var data = req.body
  }
  
  blogs.find(data , function (err, doc) {
  	if(err) {
  		res.send({
  			status : 0,
  			value : 'error'
  		})
  	} else if (doc.length != 0) {
  		res.send({
  			status : 1,
  			blogs : doc
  		})
  	} else {
  		res.send({
  			status : 2,
  			value : 'null'
  		})
  	}
  })
});

//a blogs

router.post('/blogs', function (req, res, next) {
  console.log(req.body._id)
  blogs.findOne({"_id" : req.body._id}, function (err, doc) {
  	if(err) {
  		res.send({
  			status : 0,
  			value : 'error'
  		})
  	} else if (doc) {
  		res.send({
  			status : 1,
  			blogs : doc
  		})
  	} else {
  		res.send({
  			status : 2,
  			value : 'null'
  		})
  	}
  })
});

router.get('/login', function (req, res, next) {
  res.render('admin/login');
});

// need check
router.get('/usr', function (req, res, next) {
  if(res.locals.id && res.locals.user) {
	  res.render('admin/index');
  } else {
  		res.render('admin/login');
  }
});

// the request
// login
router.post('/login', function (req, res, next) {
	if(res.locals.id && res.locals.user) {
	  res.render('admin/index');
	} 

	var md5 = crypto.createHash('md5'); 
	var name = req.body.name,
      password = md5.update(req.body.password).digest('base64');

	usrs.findOne({name : name}, function (err, doc) {
		if(doc) {
			if (doc.password != password) {
				res.send({
					status : 3,
					value : 'password is error'
				});
			} else {
				req.session.user = name;
         		req.session.id = doc.id;

				res.send({
					status : 1,
					value : 'login success'
				});
			}
		} else if(err) {
			res.send({
				status : 0,
				value : 'error'
			});
		} else {
			res.send({
				status : 4,
				value :'usr isn\'t exit'
			});
		} 
	}) 
})

//add blogs 
router.post('/addBlogs', function (req, res, next) {
	// var content = marked(req.body.content).replace(/\\n/g,'');
	
	try {
		blogs.create({
			content :  marked(req.body.content),
			time : Date.now(),
			classfiy : req.body.classfiy
		})

		res.send({
			status : 1,
			value : 'add success'
		})

	} catch (e) {
		res.send({
			status : 0,
			value : 'add failure'
		})
	}
})

module.exports = router;
