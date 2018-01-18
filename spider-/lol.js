(function () {
	// module 
	var fs = require('fs');
	var request = require('request');
	var cheerio = require('cheerio');
	var mongoose = require('mongoose');
	var emitter = require('events').EventEmitter;
	var emitterOn = new emitter();

	// schema
	var heros = require('./about');


	// url and save path
	var url = 'http://lol.duowan.com/s/heroes.html';
	var fileUrl = '/home/hanfeng/my/lolSave/images/';

	// mongodb 
	mongoose.connect('mongodb://127.0.0.1/lol');

	// fetch the hero & count
	var link = [];
	//var count = 0;

	emitterOn.on('down', function () {
		// var $,
		// 	thisName,
		// 	thisType,
		// 	thisLife,
		// 	thisPhy,
		// 	thisMag,
		// 	thisDef,
		// 	thisDif;

		for(var i = 0; i < link.length; i++) {
			(function (i) {
				request(link[i], function (err, res, datas) {
					var $ = cheerio.load(datas);
					var thisName = $('.info h3').text().replace(/\S\S视频/g,'');
					var thisMag = $('span.v2').attr('style');
					var pic = $('.pic-fl img').attr('src');
					var picData = '';
					
					try {
						request({url : pic, encoding : null}, function (err, res, data) {
							picData = data;

							if(err) {
								console.error('抓取第'+ (i + 1) + '个英雄' + $('.info h3').text().replace(/\S\S视频/g,'') + '失败\n')
								return false;
							}

							//count++;

							heros.findOne({name : thisName}, function (err, doc) {
								if(doc) {
									console.log("第" + (i + 1) + "个英雄：" + thisName + '已经存在了!!!!,开始更新');
									
									heros.update({name : thisName},{
										name : thisName,
										type : 'String',
										life : 'String',
										attr : {
											phy : $('span.v2').attr('style'),
											mag : 'String',
											def : 'String',
											dif : 'String'
										},
										story : 'String',
										skill : {
											title : 'String',
											detail : 'String'
										},
										pic : picData
									}, function () {})

									console.log("第" + (i + 1) + "个英雄：" + thisName + '更新完成\n');
								} else if(err) {
									console.log('查询失败!!!');
								}  else {
									console.log("第" + (i + 1) + "个英雄：" + thisName + "开始");

									heros.create({
										name : thisName,
										type : 'String',
										life : 'String',
										attr : {
											phy : $('span.v2').attr('style'),
											mag : 'String',
											def : 'String',
											dif : 'String'
										},
										story : 'String',
										skill : {
											title : 'String',
											detail : 'String'
										},
										pic : picData
									})

									console.log("第" + (i + 1) + "个英雄：" + thisName + "完成\n");
								}
							})
						}).pipe(
							fs.createWriteStream(fileUrl+thisName+'.jpg', picData, "binary", function (err) {
					            if(err) {
					                console.log(err);
								} 
				        	})
						)
					} catch (error) {
						console.log('不存在此英雄\n');
					}
				})
			})(i)
		}
	})

	request(url, function (err, res, data) {
		var $ = cheerio.load(data)

		$('.lol_champion').map(function (i, elem) {
			link[i] = elem.attribs.href	
		})

		emitterOn.emit('down');
	})
})()
